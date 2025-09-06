const pool = require('../config/db');

// Get user's purchase history
const getPurchaseHistory = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;

    const result = await pool.query(`
      SELECT 
        p.purchase_id,
        p.quantity,
        p.purchase_date,
        pr.product_id,
        pr.title,
        pr.description,
        pr.price,
        pr.image_url,
        pr.category
      FROM purchases p
      JOIN products pr ON p.product_id = pr.product_id
      WHERE p.user_id = $1
      ORDER BY p.purchase_date DESC
      LIMIT $2 OFFSET $3
    `, [userId, limit, offset]);

    // Get total count for pagination
    const countResult = await pool.query(
      'SELECT COUNT(*) FROM purchases WHERE user_id = $1',
      [userId]
    );
    const totalPurchases = parseInt(countResult.rows[0].count);

    // Calculate total amount for each purchase
    const purchases = result.rows.map(purchase => ({
      ...purchase,
      total_amount: parseFloat((purchase.price * purchase.quantity).toFixed(2))
    }));

    res.json({
      success: true,
      data: {
        purchases,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalPurchases / limit),
          totalPurchases,
          limit: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get purchase history error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Purchase items from cart
const purchaseFromCart = async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    const userId = req.user.user_id;

    // Get all items from cart
    const cartResult = await client.query(`
      SELECT 
        c.product_id,
        c.quantity,
        p.title,
        p.price
      FROM cart c
      JOIN products p ON c.product_id = p.product_id
      WHERE c.user_id = $1
    `, [userId]);

    if (cartResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    const cartItems = cartResult.rows;
    const purchases = [];
    let totalAmount = 0;

    // Validate stock and prepare purchases
    for (const item of cartItems) {
      // No stock check as per new schema, assuming product is available if in cart
      
      purchases.push({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      });

      totalAmount += item.price * item.quantity;
    }

    // Create purchases
    for (const purchase of purchases) {
      await client.query(
        'INSERT INTO purchases (user_id, product_id, quantity) VALUES ($1, $2, $3)',
        [userId, purchase.product_id, purchase.quantity]
      );
    }

    // Clear cart
    await client.query('DELETE FROM cart WHERE user_id = $1', [userId]);

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Purchase completed successfully',
      data: {
        totalItems: purchases.length,
        totalAmount: parseFloat(totalAmount.toFixed(2)),
        purchases: purchases.map(p => ({
          product_id: p.product_id,
          quantity: p.quantity,
          price: p.price
        }))
      }
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Purchase error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  } finally {
    client.release();
  }
};

// Purchase single product
const purchaseProduct = async (req, res) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    const userId = req.user.user_id;
    const { product_id, quantity } = req.body;

    // Validation
    if (!product_id || !quantity || quantity < 1) {
      await client.query('ROLLBACK');
      return res.status(400).json({
        success: false,
        message: 'Product ID and quantity are required'
      });
    }

    const productResult = await client.query(
      'SELECT price FROM products WHERE product_id = $1',
      [product_id]
    );
    if (productResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    const product = productResult.rows[0];
    // Assuming no stock management based on schema
    
    // Create purchase
    await client.query(
      'INSERT INTO purchases (user_id, product_id, quantity) VALUES ($1, $2, $3)',
      [userId, product_id, quantity]
    );

    await client.query('COMMIT');

    const totalAmount = product.price * quantity;

    res.status(201).json({
      success: true,
      message: 'Product purchased successfully',
      data: {
        product_id,
        quantity,
        price: product.price,
        totalAmount: parseFloat(totalAmount.toFixed(2))
      }
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Purchase product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  } finally {
    client.release();
  }
};

// Get purchase statistics
const getPurchaseStats = async (req, res) => {
  try {
    const userId = req.user.user_id;

    // Get total purchases count
    const totalPurchasesResult = await pool.query(
      'SELECT COUNT(*) as total_purchases FROM purchases WHERE user_id = $1',
      [userId]
    );

    // Get total amount spent
    const totalAmountResult = await pool.query(`
      SELECT COALESCE(SUM(p.quantity * pr.price), 0) as total_spent
      FROM purchases p
      JOIN products pr ON p.product_id = pr.product_id
      WHERE p.user_id = $1
    `, [userId]);

    // Get most purchased product
    const mostPurchasedResult = await pool.query(`
      SELECT 
        pr.title,
        pr.product_id,
        SUM(p.quantity) as total_quantity,
        COUNT(p.purchase_id) as purchase_count
      FROM purchases p
      JOIN products pr ON p.product_id = pr.product_id
      WHERE p.user_id = $1
      GROUP BY pr.product_id, pr.title
      ORDER BY total_quantity DESC
      LIMIT 1
    `, [userId]);

    res.json({
      success: true,
      data: {
        totalPurchases: parseInt(totalPurchasesResult.rows[0].total_purchases),
        totalSpent: parseFloat(totalAmountResult.rows[0].total_spent),
        mostPurchasedProduct: mostPurchasedResult.rows[0] || null
      }
    });
  } catch (error) {
    console.error('Get purchase stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  getPurchaseHistory,
  purchaseFromCart,
  purchaseProduct,
  getPurchaseStats
};

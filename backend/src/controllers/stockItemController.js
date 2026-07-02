const pool = require("../config/db");

// ================= Create Stock Item =================

const createStockItem = async (req, res) => {
  try {
    const {
      company_id,
      stock_group_id,
      unit_id,
      item_name,
      sku,
      purchase_price,
      selling_price,
      quantity,
      gst_percentage,
    } = req.body;

    if (
      !company_id ||
      !stock_group_id ||
      !unit_id ||
      !item_name ||
      !sku
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // Check Company
    const company = await pool.query(
      "SELECT * FROM companies WHERE id = $1",
      [company_id]
    );

    if (company.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Check Stock Group
    const stockGroup = await pool.query(
      "SELECT * FROM stock_groups WHERE id = $1",
      [stock_group_id]
    );

    if (stockGroup.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Stock Group not found",
      });
    }

    // Check Unit
    const unit = await pool.query(
      "SELECT * FROM units WHERE id = $1",
      [unit_id]
    );

    if (unit.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Unit not found",
      });
    }

    // Duplicate SKU
    const existingItem = await pool.query(
      `SELECT *
       FROM stock_items
       WHERE company_id = $1
       AND sku = $2`,
      [company_id, sku]
    );

    if (existingItem.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "SKU already exists",
      });
    }

    const result = await pool.query(
      `INSERT INTO stock_items
      (
        company_id,
        stock_group_id,
        unit_id,
        item_name,
        sku,
        purchase_price,
        selling_price,
        quantity,
        gst_percentage
      )

      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)

      RETURNING *`,
      [
        company_id,
        stock_group_id,
        unit_id,
        item_name,
        sku,
        purchase_price || 0,
        selling_price || 0,
        quantity || 0,
        gst_percentage || 0,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Stock Item created successfully",
      stockItem: result.rows[0],
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= Get All Stock Items =================

const getStockItems = async (req, res) => {
  try {

    const { company_id } = req.query;

    const result = await pool.query(
      `
      SELECT
        si.*,
        sg.group_name,
        u.unit_name,
        u.unit_symbol

      FROM stock_items si

      LEFT JOIN stock_groups sg
      ON si.stock_group_id = sg.id

      LEFT JOIN units u
      ON si.unit_id = u.id

      WHERE si.company_id = $1

      ORDER BY si.id ASC
      `,
      [company_id]
    );

    res.status(200).json({
      success: true,
      count: result.rows.length,
      stockItems: result.rows,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= Get Stock Item By ID =================

const getStockItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
        si.*,
        sg.group_name,
        u.unit_name,
        u.unit_symbol

      FROM stock_items si

      LEFT JOIN stock_groups sg
      ON si.stock_group_id = sg.id

      LEFT JOIN units u
      ON si.unit_id = u.id

      WHERE si.id = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Stock Item not found",
      });
    }

    res.status(200).json({
      success: true,
      stockItem: result.rows[0],
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= Update Stock Item =================

const updateStockItem = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      company_id,
      stock_group_id,
      unit_id,
      item_name,
      sku,
      purchase_price,
      selling_price,
      quantity,
      gst_percentage,
    } = req.body;

    const item = await pool.query(
      "SELECT * FROM stock_items WHERE id=$1",
      [id]
    );

    if (item.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Stock Item not found",
      });
    }

    const duplicate = await pool.query(
      `SELECT *
       FROM stock_items
       WHERE company_id=$1
       AND sku=$2
       AND id!=$3`,
      [company_id, sku, id]
    );

    if (duplicate.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "SKU already exists",
      });
    }

    const result = await pool.query(
      `UPDATE stock_items

      SET

      company_id=$1,
      stock_group_id=$2,
      unit_id=$3,
      item_name=$4,
      sku=$5,
      purchase_price=$6,
      selling_price=$7,
      quantity=$8,
      gst_percentage=$9,
      updated_at=CURRENT_TIMESTAMP

      WHERE id=$10

      RETURNING *`,
      [
        company_id,
        stock_group_id,
        unit_id,
        item_name,
        sku,
        purchase_price,
        selling_price,
        quantity,
        gst_percentage,
        id,
      ]
    );

    res.status(200).json({
      success: true,
      message: "Stock Item updated successfully",
      stockItem: result.rows[0],
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= Delete Stock Item =================

const deleteStockItem = async (req, res) => {
  try {

    const { id } = req.params;

    const item = await pool.query(
      "SELECT * FROM stock_items WHERE id=$1",
      [id]
    );

    if (item.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Stock Item not found",
      });
    }

    await pool.query(
      "DELETE FROM stock_items WHERE id=$1",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Stock Item deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createStockItem,
  getStockItems,
  getStockItemById,
  updateStockItem,
  deleteStockItem,
};
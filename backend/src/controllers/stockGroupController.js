const pool = require("../config/db");

// ================= Create Stock Group =================

const createStockGroup = async (req, res) => {
  try {
    const { company_id, group_name, description } = req.body;

    if (!company_id || !group_name) {
      return res.status(400).json({
        success: false,
        message: "Company ID and Group Name are required",
      });
    }

    // Check Company
    const company = await pool.query(
      "SELECT * FROM companies WHERE id=$1",
      [company_id]
    );

    if (company.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Duplicate Check
    const existing = await pool.query(
      `SELECT * FROM stock_groups
       WHERE company_id=$1
       AND group_name=$2`,
      [company_id, group_name]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Stock Group already exists",
      });
    }

    const result = await pool.query(
      `INSERT INTO stock_groups
      (company_id,group_name,description)
      VALUES($1,$2,$3)
      RETURNING *`,
      [company_id, group_name, description]
    );

    res.status(201).json({
      success: true,
      message: "Stock Group created successfully",
      stockGroup: result.rows[0],
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= Get All Stock Groups =================

const getStockGroups = async (req, res) => {
  try {

    const { company_id } = req.query;

    const result = await pool.query(
      `SELECT *
       FROM stock_groups
       WHERE company_id=$1
       ORDER BY id ASC`,
      [company_id]
    );

    res.status(200).json({
      success: true,
      count: result.rows.length,
      stockGroups: result.rows,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= Get Stock Group By ID =================

const getStockGroupById = async (req, res) => {
  try {

    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM stock_groups WHERE id=$1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Stock Group not found",
      });
    }

    res.status(200).json({
      success: true,
      stockGroup: result.rows[0],
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= Update Stock Group =================

const updateStockGroup = async (req, res) => {
  try {

    const { id } = req.params;
    const { company_id, group_name, description } = req.body;

    const group = await pool.query(
      "SELECT * FROM stock_groups WHERE id=$1",
      [id]
    );

    if (group.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Stock Group not found",
      });
    }

    const duplicate = await pool.query(
      `SELECT *
       FROM stock_groups
       WHERE company_id=$1
       AND group_name=$2
       AND id!=$3`,
      [company_id, group_name, id]
    );

    if (duplicate.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Stock Group already exists",
      });
    }

    const result = await pool.query(
      `UPDATE stock_groups
       SET company_id=$1,
           group_name=$2,
           description=$3,
           updated_at=CURRENT_TIMESTAMP
       WHERE id=$4
       RETURNING *`,
      [company_id, group_name, description, id]
    );

    res.status(200).json({
      success: true,
      message: "Stock Group updated successfully",
      stockGroup: result.rows[0],
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================= Delete Stock Group =================

const deleteStockGroup = async (req, res) => {
  try {

    const { id } = req.params;

    const group = await pool.query(
      "SELECT * FROM stock_groups WHERE id=$1",
      [id]
    );

    if (group.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Stock Group not found",
      });
    }

    await pool.query(
      "DELETE FROM stock_groups WHERE id=$1",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Stock Group deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createStockGroup,
  getStockGroups,
  getStockGroupById,
  updateStockGroup,
  deleteStockGroup,
};
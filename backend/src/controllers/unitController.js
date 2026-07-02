const pool = require("../config/db");

// ================= Create Unit =================

const createUnit = async (req, res) => {
  try {
    const { company_id, unit_name, unit_symbol } = req.body;

    if (!company_id || !unit_name || !unit_symbol) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

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

    const existingUnit = await pool.query(
      `SELECT * FROM units
       WHERE company_id=$1
       AND unit_name=$2`,
      [company_id, unit_name]
    );

    if (existingUnit.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Unit already exists",
      });
    }

    const result = await pool.query(
      `INSERT INTO units
      (company_id,unit_name,unit_symbol)
      VALUES($1,$2,$3)
      RETURNING *`,
      [company_id, unit_name, unit_symbol]
    );

    res.status(201).json({
      success: true,
      message: "Unit created successfully",
      unit: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Get All Units =================

const getUnits = async (req, res) => {
  try {
    const { company_id } = req.query;

    const result = await pool.query(
      `SELECT *
       FROM units
       WHERE company_id=$1
       ORDER BY id ASC`,
      [company_id]
    );

    res.status(200).json({
      success: true,
      count: result.rows.length,
      units: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Get Unit By ID =================

const getUnitById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM units WHERE id=$1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Unit not found",
      });
    }

    res.status(200).json({
      success: true,
      unit: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Update Unit =================

const updateUnit = async (req, res) => {
  try {
    const { id } = req.params;
    const { company_id, unit_name, unit_symbol } = req.body;

    const unit = await pool.query(
      "SELECT * FROM units WHERE id=$1",
      [id]
    );

    if (unit.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Unit not found",
      });
    }

    const duplicate = await pool.query(
      `SELECT * FROM units
       WHERE company_id=$1
       AND unit_name=$2
       AND id!=$3`,
      [company_id, unit_name, id]
    );

    if (duplicate.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Unit already exists",
      });
    }

    const result = await pool.query(
      `UPDATE units
       SET company_id=$1,
           unit_name=$2,
           unit_symbol=$3,
           updated_at=CURRENT_TIMESTAMP
       WHERE id=$4
       RETURNING *`,
      [company_id, unit_name, unit_symbol, id]
    );

    res.status(200).json({
      success: true,
      message: "Unit updated successfully",
      unit: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= Delete Unit =================

const deleteUnit = async (req, res) => {
  try {
    const { id } = req.params;

    const unit = await pool.query(
      "SELECT * FROM units WHERE id=$1",
      [id]
    );

    if (unit.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Unit not found",
      });
    }

    await pool.query(
      "DELETE FROM units WHERE id=$1",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Unit deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createUnit,
  getUnits,
  getUnitById,
  updateUnit,
  deleteUnit,
};
const pool = require("../config/db");

// ================= Create Group =================

const createGroup = async (req, res) => {
  try {
    const { company_id, group_name, group_type, parent_group, description } =
      req.body;

    if (!company_id || !group_name || !group_type) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // Check Company

    const company = await pool.query(
      "SELECT * FROM companies WHERE id=$1",

      [company_id],
    );

    if (company.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Duplicate Group

    const existingGroup = await pool.query(
      `SELECT *
             FROM groups
             WHERE company_id=$1
             AND group_name=$2`,

      [company_id, group_name],
    );

    if (existingGroup.rows.length > 0) {
      return res.status(400).json({
        success: false,

        message: "Group already exists",
      });
    }

    const result = await pool.query(
      `INSERT INTO groups(

                company_id,
                group_name,
                group_type,
                parent_group,
                description

            )

            VALUES($1,$2,$3,$4,$5)

            RETURNING *`,

      [company_id, group_name, group_type, parent_group, description],
    );

    res.status(201).json({
      success: true,

      message: "Group Created Successfully",

      group: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// get all groups

const getGroups = async (req, res) => {
  try {
    const { company_id } = req.query;

    if (!company_id) {
      return res.status(400).json({
        success: false,
        message: "Company ID is required",
      });
    }

    const result = await pool.query(
      `SELECT *
       FROM groups
       WHERE company_id = $1
       ORDER BY id ASC`,
      [company_id],
    );

    res.status(200).json({
      success: true,
      count: result.rows.length,
      groups: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get group by id
const getGroupById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT *
       FROM groups
       WHERE id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    res.status(200).json({
      success: true,
      group: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update group

const updateGroup = async (req, res) => {
  try {
    const { id } = req.params;

    const { company_id, group_name, group_type, parent_group, description } =
      req.body;

    const group = await pool.query("SELECT * FROM groups WHERE id = $1", [id]);

    if (group.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    const duplicate = await pool.query(
      `SELECT *
       FROM groups
       WHERE company_id = $1
       AND group_name = $2
       AND id != $3`,
      [company_id, group_name, id],
    );

    if (duplicate.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Group already exists",
      });
    }

    const result = await pool.query(
      `UPDATE groups
       SET company_id = $1,
           group_name = $2,
           group_type = $3,
           parent_group = $4,
           description = $5,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [company_id, group_name, group_type, parent_group, description, id],
    );

    res.status(200).json({
      success: true,
      message: "Group updated successfully",
      group: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete group

const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;

    const group = await pool.query("SELECT * FROM groups WHERE id = $1", [id]);

    if (group.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    await pool.query("DELETE FROM groups WHERE id = $1", [id]);

    res.status(200).json({
      success: true,
      message: "Group deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createGroup,
  getGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
};

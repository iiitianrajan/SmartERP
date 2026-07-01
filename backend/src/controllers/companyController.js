const pool = require("../config/db");

const createCompany = async (req, res) => {
  try {
    const {
      company_name,
      address,
      gst_number,
      financial_year,
      state,
      contact_number,
    } = req.body;

    if (
      !company_name ||
      !address ||
      !financial_year ||
      !state ||
      !contact_number
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userId = req.user.id;

    // Maximum 5 Companies

    const count = await pool.query(
      "SELECT COUNT(*) FROM companies WHERE user_id=$1",
      [userId],
    );

    if (Number(count.rows[0].count) >= 5) {
      return res.status(400).json({
        success: false,
        message: "Maximum 5 companies allowed",
      });
    }

    const result = await pool.query(
      `
            INSERT INTO companies
            (
                user_id,
                company_name,
                address,
                gst_number,
                financial_year,
                state,
                contact_number
            )

            VALUES($1,$2,$3,$4,$5,$6,$7)

            RETURNING *
            `,
      [
        userId,
        company_name,
        address,
        gst_number,
        financial_year,
        state,
        contact_number,
      ],
    );

    res.status(201).json({
      success: true,

      message: "Company Created Successfully",

      company: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// get all companies
const getCompanies = async (req, res) => {
    try {

        const userId = req.user.id;

        const result = await pool.query(
            `SELECT *
             FROM companies
             WHERE user_id = $1
             ORDER BY id ASC`,
            [userId]
        );

        res.status(200).json({
            success: true,
            count: result.rows.length,
            companies: result.rows
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// get company by id
const getCompanyById = async (req, res) => {
    try {

        const { id } = req.params;
        const userId = req.user.id;

        const result = await pool.query(
            `SELECT *
             FROM companies
             WHERE id = $1
             AND user_id = $2`,
            [id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        res.status(200).json({
            success: true,
            company: result.rows[0]
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const {
      company_name,
      address,
      gst_number,
      financial_year,
      state,
      contact_number,
    } = req.body;

    // Check if company exists and belongs to logged-in user
    const company = await pool.query(
      `SELECT * FROM companies
       WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );

    if (company.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Validate required fields
    if (
      !company_name ||
      !address ||
      !financial_year ||
      !state ||
      !contact_number
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Update company
    const result = await pool.query(
      `UPDATE companies
       SET company_name = $1,
           address = $2,
           gst_number = $3,
           financial_year = $4,
           state = $5,
           contact_number = $6,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $7 AND user_id = $8
       RETURNING *`,
      [
        company_name,
        address,
        gst_number,
        financial_year,
        state,
        contact_number,
        id,
        userId,
      ]
    );

    res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check whether company exists and belongs to logged-in user
    const company = await pool.query(
      `SELECT * FROM companies
       WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );

    if (company.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Delete company
    await pool.query(
      `DELETE FROM companies
       WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );

    res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany
};

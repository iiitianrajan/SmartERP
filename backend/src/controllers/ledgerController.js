const pool = require("../config/db");

//  Create Ledger 

const createLedger = async (req, res) => {

    try {

        const {

            company_id,
            ledger_name,
            ledger_group,
            opening_balance,
            balance_type,
            mobile,
            email,
            address,
            gst_number

        } = req.body;

        if (
            !company_id ||
            !ledger_name ||
            !ledger_group ||
            !balance_type
        ) {

            return res.status(400).json({

                success: false,
                message: "Required fields are missing"

            });

        }

        // Company Exists ?

        const company = await pool.query(

            "SELECT * FROM companies WHERE id=$1",

            [company_id]

        );

        if (company.rows.length === 0) {

            return res.status(404).json({

                success: false,
                message: "Company not found"

            });

        }

        // Duplicate Ledger

        const existingLedger = await pool.query(

            `SELECT *
             FROM ledgers
             WHERE company_id=$1
             AND ledger_name=$2`,

            [company_id, ledger_name]

        );

        if (existingLedger.rows.length > 0) {

            return res.status(400).json({

                success: false,
                message: "Ledger already exists"

            });

        }

        const result = await pool.query(

            `INSERT INTO ledgers(

                company_id,
                ledger_name,
                ledger_group,
                opening_balance,
                balance_type,
                mobile,
                email,
                address,
                gst_number

            )

            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)

            RETURNING *`,

            [

                company_id,
                ledger_name,
                ledger_group,
                opening_balance || 0,
                balance_type,
                mobile,
                email,
                address,
                gst_number

            ]

        );

        res.status(201).json({

            success: true,

            message: "Ledger Created Successfully",

            ledger: result.rows[0]

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const getLedgers = async (req, res) => {
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
       FROM ledgers
       WHERE company_id = $1
       ORDER BY id ASC`,
      [company_id]
    );

    res.status(200).json({
      success: true,
      count: result.rows.length,
      ledgers: result.rows,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getLedgerById = async (req, res) => {
  try {

    const { id } = req.params;

    const result = await pool.query(
      `SELECT *
       FROM ledgers
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Ledger not found",
      });
    }

    res.status(200).json({
      success: true,
      ledger: result.rows[0],
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const updateLedger = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      company_id,
      ledger_name,
      ledger_group,
      opening_balance,
      balance_type,
      mobile,
      email,
      address,
      gst_number,
    } = req.body;

    // Check if ledger exists
    const ledger = await pool.query(
      "SELECT * FROM ledgers WHERE id = $1",
      [id]
    );

    if (ledger.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Ledger not found",
      });
    }

    // Check duplicate ledger name within same company
    const duplicate = await pool.query(
      `SELECT * FROM ledgers
       WHERE company_id = $1
       AND ledger_name = $2
       AND id != $3`,
      [company_id, ledger_name, id]
    );

    if (duplicate.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Ledger already exists",
      });
    }

    const result = await pool.query(
      `UPDATE ledgers
       SET company_id = $1,
           ledger_name = $2,
           ledger_group = $3,
           opening_balance = $4,
           balance_type = $5,
           mobile = $6,
           email = $7,
           address = $8,
           gst_number = $9,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $10
       RETURNING *`,
      [
        company_id,
        ledger_name,
        ledger_group,
        opening_balance,
        balance_type,
        mobile,
        email,
        address,
        gst_number,
        id,
      ]
    );

    res.status(200).json({
      success: true,
      message: "Ledger updated successfully",
      ledger: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteLedger = async (req, res) => {
  try {
    const { id } = req.params;

    const ledger = await pool.query(
      "SELECT * FROM ledgers WHERE id = $1",
      [id]
    );

    if (ledger.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Ledger not found",
      });
    }

    await pool.query(
      "DELETE FROM ledgers WHERE id = $1",
      [id]
    );

    res.status(200).json({
      success: true,
      message: "Ledger deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}; 

module.exports = {

    createLedger,
    getLedgers,
    getLedgerById,
    updateLedger ,
    deleteLedger 


};
import Axios from 'axios'
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './add.css';

function Company() {

    const [company_Id, setCompany_Id] = useState("");
    const [company_name, setCompany_name] = useState("");

    const navigate = useNavigate();

    const saveMaterial = async (e) => {
        e.preventDefault();
        try {
            await Axios.post('http://localhost:3001/company', {
                company_Id,
                company_name,
            });
            navigate("/companyshow");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="Appcontainer">
      <div className="add">
        <form onSubmit={saveMaterial}>
          <br />
          <div className="field1">
            <label className="label">ชื่อบริษัท :</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={company_name}
                onChange={(e) => setCompany_name(e.target.value)}
                placeholder=""
              />
            </div>
          </div>

          <br />
          <div className="field">
            <button type="submit" class="btn btn-primary">
              เพิ่ม
            </button>
          </div>
        </form>
      </div><br />
    </div>
  );
};

export default Company;
import Axios from 'axios'
import React from "react";
import { useState, useEffect } from "react";

function Materialshow() {

    //วัสดุใกล้หมด
    const [material, setMaterial] = useState([]);

    useEffect(() => {
        getMaterial();
    }, []);

    const getMaterial = async () => {
        const response = await Axios.get('http://localhost:3001/material');
        const materials = response.data.filter(material => material.material_remaining < 5);
        setMaterial(materials);
    };

    //แจ้งเตือนคนเบิก
    const [orderd, setOrderd] = useState([]);
    const orderdFiltered = orderd.filter((val) => val.order_durablearticles_status === null);

    useEffect(() => {
        getOrderd();
    }, []);

    const getOrderd = async () => {
        const response = await Axios.get('http://localhost:3001/order_durablearticles3');
        setOrderd(response.data.reverse()); // Reverse orderd array
    };

    //แจ้งซ่อม
    const [orderm, setOrderm] = useState([]);
    const ordermFiltered = orderm.filter((val) => val.repair_status === "รอดำเนินการ");

    useEffect(() => {
        getOrderm();
    }, []);

    const getOrderm = async () => {
        const response = await Axios.get('http://localhost:3001/repair2');
        setOrderm(response.data);
    };

    return (
        <div style={{ paddingTop: "15px" }}>

<div style={{ backgroundColor: "#FFE5CC", padding: "20px", borderRadius: "5px", textAlign: "center" }}>
                <h3 style={{ color: "orange" }}>รายการยืมครุภัณฑ์ <span role="img" aria-label="warning">⚠️</span> ควรจัดการ</h3>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <table className='warn2' style={{ borderCollapse: "collapse", width: "90%", margin: "0 auto", marginTop: "10px" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#FFB266" }}>
                                <th scope="col">เลขครุภัณฑ์</th>
                                <th scope="col">ชื่อครุภัณฑ์</th>
                                <th scope="col">วันที่</th>
                                <th scope="col">ชื่อผู้เบิก</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderdFiltered.map((val, index) => (
                                <tr key={val.order_durablearticles_Id}>
                                    <td>{val.durablearticles_Id}</td>
                                    <td>{val.durablearticles_name}</td>
                                    <td>{(val.order_durablearticles_date == null) ? "" : new Date(val.order_durablearticles_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</td>
                                    <td>{val.username}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div><br/>

            <div style={{ backgroundColor: "#E5FFCC", padding: "20px", borderRadius: "5px", textAlign: "center" }}>
                <h3 style={{ color: "green" }}>รายการแจ้งซ่อมครุภัณฑ์ <span role="img" aria-label="warning">⚠️</span> ควรจัดการ</h3>
                <div style={{ display: "flex", justifyContent: "center" }}></div>
                <table className='warn2' style={{ borderCollapse: "collapse", width: "90%", margin: "0 auto", marginTop: "10px" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#B2FF66" }}>
                            <th scope="col">เลขครุภัณฑ์</th>
                            <th scope="col">ชื่อครุภัณฑ์</th>
                            <th scope="col">วันที่แจ้ง</th>
                            <th scope="col">ชื่อผู้แจ้ง</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordermFiltered.map((val, index) => (
                            <tr key={val.repair_durablearticles_Id}>
                                <td>{val.durablearticles_Id}</td>
                                <td>{val.durablearticles_name}</td>
                                <td>{(val.repair_durablearticles_date == null) ? "" : new Date(val.repair_durablearticles_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</td>
                                <td>{val.Informer}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div><br />

            <div style={{ backgroundColor: "#f8d7da", padding: "20px", borderRadius: "5px", textAlign: "center" }}>
                <h3 style={{ color: "red" }}>วัสดุที่เหลือน้อย <span role="img" aria-label="warning">⚠️</span> ควรสั่งซื้อเพิ่ม</h3>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <table className='warn2' style={{ borderCollapse: "collapse", width: "90%", margin: "0 auto", marginTop: "10px" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#f5c6cb" }}>
                                <th>เลขวัสดุ</th>
                                <th>ชื่อ</th>
                                <th>คงเหลือ</th>
                                <th>หน่วยนับ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {material.map((val, index) => (
                                <tr key={val.material_Id}>
                                    <td>{val.material_Id}</td>
                                    <td>{val.material_name}</td>
                                    <td>{val.material_remaining}</td>
                                    <td>{val.material_unit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default Materialshow
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import { update_student } from "../../Store/Slice/studentInformationSlice";

function PaymentInput() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const students = useSelector((state) => state.StAndCourse);
  console.log("this is student", students);

  // whenever we type in input fileld that will be sync to paymentAmount
  const [paymentAmount, setPaymentAmount] = useState("");
  const [localStudent, setLocalStudent] = useState(null);

  useEffect(() => {
    const foundStudent = students.find((s) => s.id === id); // in this student variable it contains the that matched name that we search in the search box if student have same name then it will be two array of obj so here we are matching that id  which student is trying to pay
    setLocalStudent(foundStudent);    // fidn return only that particular emelent so it must be returen only obj whithout making new array 
  }, [students, id]);


  //
  const courseFee = localStudent?.courseDetails?.courseFee;
  const totalPaid = (localStudent?.paymentHistory || []).reduce(
    (sum, payment) => sum + payment.amount,
    0
  );


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!localStudent) return;

    if (!courseFee || isNaN(courseFee)) {
      alert("Course fee is not set. Payment cannot be processed.");
      return;
    }

    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    const remainingFee = courseFee - totalPaid;

    if (amount > remainingFee) {
      alert(`The maximum amount you can pay is RS${remainingFee}`);
      return;
    }

    const newTotalPaid = totalPaid + amount;
    const paymentStatus =
      newTotalPaid >= courseFee ? "Full Paid" : "Partially Paid";

    const newPayment = {
      amount,
      date: new Date().toISOString(),
      status: paymentStatus,
    };

    const updatedStudent = {
      ...localStudent,
      paymentHistory: [...(localStudent.paymentHistory || []), newPayment],
      paymentStatus,
    };

    
    setLocalStudent(updatedStudent);
    dispatch(update_student(updatedStudent));
    setPaymentAmount("");
  };

  if (!localStudent) {
    return (
      <DashboardLayout>
        <p>Student not found</p>
      </DashboardLayout>
    );
  }

  const remainingFee = courseFee ? Math.max(0, courseFee - totalPaid) : 0;

  return (
    <DashboardLayout>
      <div>
        <h2>{localStudent.fullName}</h2>
        <p>Email: {localStudent.email}</p>
        <p>Course: {localStudent.courseDetails?.courseName || "N/A"}</p>
        <p>Course Fee: {courseFee ? `RS:${courseFee}` : "Not set"}</p>
        {courseFee && <p>Remaining Fee: RS:{remainingFee}</p>}
      </div>
      {courseFee ? (
        remainingFee > 0 ? (
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              name="pay"
              placeholder="Amount"
              className="form-control"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              // max={remainingFee}
            />
            <input
              type="submit"
              className="btn btn-info mt-4"
              value="Submit Payment"
            />
          </form>
        ) : (
          <p>Full payment has been made. No further payment is required.</p>
        )
      ) : (
        <p>Course fee is not set. Payment cannot be processed.</p>
      )}


      <div>
        <h3>Payment History</h3>
        {localStudent.paymentHistory &&
        localStudent.paymentHistory.length > 0 ? (
          <ul>
            {localStudent.paymentHistory.map((payment, index) => (
              <li key={index}>
                Date: {new Date(payment.date).toLocaleDateString()} - Amount: RS: 
                {payment.amount} - Status: {payment.status}
              </li>
            ))}
          </ul>
        ) : (
          <p>No payment history available</p>
        )}
      </div>
    </DashboardLayout>
  );
}

export default PaymentInput;

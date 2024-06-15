import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AxiosInstance from '../Axios'; 
import { useNavigate, useParams } from 'react-router-dom';
import './ChargebackEdit.css'; 

const EditChargeback = () => {
  const { id: chargebackId } = useParams();
  const [chargeback, setChargeback] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchChargebackData = async () => {
      try {
        const response = await AxiosInstance.get(`/api/v1/chargebacks/${chargebackId}/`);
        setChargeback(response.data);  
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch chargeback data:', error);
        setLoading(false);
      }
    };

    fetchChargebackData();
  }, [chargebackId, setValue]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await AxiosInstance.get('http://127.0.0.1:8000/api/v1/users/');
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (chargeback) {
      const fields = ['title', 'description', 'authorization_number', 'amount', 'merchant_number', 'merchant_email', 'merchant_name', 'status', 'reason', 'assignedTo'];
      fields.forEach(field => {
        setValue(field, chargeback[field]);
      });
    }
  }, [chargeback, setValue]);

  const onSubmit = async (data) => {
    try {
      await AxiosInstance.patch(`/api/v1/chargebacks/${chargebackId}/edit/`, data);
      navigate('/ChargebackHome'); 
    } catch (error) {
      console.error('Failed to update chargeback:', error);
    } 
  };

  if (loading) {
    return <p>Loading chargeback data...</p>;
  }

  return (
    <div className="chargeback-section-style">
      <div className="chargeback-image-container"></div>
      <div className="chargeback-form-container">
        <h2 className="chargeback-section-title">Edit Chargeback</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="title" className="chargeback-form-label">Title:</label>
            <input {...register('title', { required: true })} placeholder="Title" className="chargeback-form-input" />
            {errors.title && <p>Title is required</p>}
          </div>
          <div>
            <label htmlFor="description" className="chargeback-form-label">Description:</label>
            <textarea {...register('description')} placeholder="Description" className="chargeback-form-input" />
          </div>
          <div>
            <label htmlFor="authorization_number" className="chargeback-form-label">Authorization Number:</label>
            <input {...register('authorization_number', { required: true })} placeholder="Authorization Number" className="chargeback-form-input" />
            {errors.authorization_number && <p>Authorization Number is required</p>}
          </div>
          <div>
            <label htmlFor="amount" className="chargeback-form-label">Amount:</label>
            <input {...register('amount', { required: true, pattern: /^\d+(\.\d{1,2})?$/ })} placeholder="Amount" className="chargeback-form-input" />
            {errors.amount && <p>Invalid amount format (e.g., 100.00)</p>}
          </div>
          <div>
            <label htmlFor="merchant_number" className="chargeback-form-label">Merchant Number:</label>
            <input {...register('merchant_number', { required: true })} placeholder="Merchant Number" className="chargeback-form-input" />
            {errors.merchant_number && <p>Merchant Number is required</p>}
          </div>
          <div>
            <label htmlFor="merchant_email" className="chargeback-form-label">Merchant Email:</label>
            <input {...register('merchant_email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} placeholder="Merchant Email" className="chargeback-form-input" />
            {errors.merchant_email && <p>Invalid email format</p>}
          </div>
          <div>
            <label htmlFor="merchant_name" className="chargeback-form-label">Merchant Name:</label>
            <input {...register('merchant_name')} placeholder="Merchant Name" className="chargeback-form-input" />
          </div>
          <div>
            <label htmlFor="status" className="chargeback-form-label">Status:</label>
            <select {...register('status')} className="chargeback-form-input">
              <option value="created">Created</option>
              <option value="sent_to_merchant">Sent to Merchant</option>
              <option value="processing_by_paymee">Processing by Paymee</option>
              <option value="processing_by_bank">Processing by Bank</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
              <option value="desactivated">Deactivated</option>
              <option value="reactivate">Reactivate</option>
            </select>
          </div>
          <div>
            <label htmlFor="reason" className="chargeback-form-label">Reason:</label>
            <textarea {...register('reason')} placeholder="Reason" className="chargeback-form-input" />
          </div>
          <div>
            <label htmlFor="assignedTo" className="chargeback-form-label">Assign To:</label>
            <select {...register('assignedTo')} className="chargeback-form-input">
              <option value="">Select a User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>{user.email}</option>
              ))}
            </select>
          </div>

          <div className="chargeback-btn-container">
            <button type="submit" className="chargeback-btn-ajouter">Modifier Chargeback</button>
            <button type="button" className="chargeback-btn-annuler" onClick={() => navigate(-1)}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditChargeback;

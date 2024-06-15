import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AxiosInstance from '../Axios'; 
import { useNavigate, useParams } from 'react-router-dom';
import './RembourssementEdit.css'; 

const EditRembourssement = () => {
  const { id: rembourssementId } = useParams();
  const [rembourssement, setRembourssement] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchRembourssementData = async () => {
      try {
        const response = await AxiosInstance.get(`/api/v1/rembourssements/${rembourssementId}/`);
        setRembourssement(response.data);  
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch rembourssement data:', error);
        setLoading(false);
      }
    };

    fetchRembourssementData();
  }, [rembourssementId, setValue]);

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
    if (rembourssement) {
      const fields = ['title', 'description', 'authorization_number', 'amount', 'merchant_number', 'merchant_email', 'merchant_name', 'status', 'reason', 'assignedTo'];
      fields.forEach(field => {
        setValue(field, rembourssement[field]);
      });
    }
  }, [rembourssement, setValue]);

  const onSubmit = async (data) => {
    try {
      await AxiosInstance.patch(`/api/v1/rembourssements/${rembourssementId}/update/`, data);
      navigate('/rembourssements'); 
    } catch (error) {
      console.error('Failed to update rembourssement:', error);
    } 
  };

  if (loading) {
    return <p>Loading rembourssement data...</p>;
  }

  return (
    <div className="rembourssement-section-style">
      <div className="rembourssement-image-container"></div>
      <div className="rembourssement-form-container">
        <h2 className="rembourssement-section-title">Edit Rembourssement</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="title" className="rembourssement-form-label">Title:</label>
            <input {...register('title', { required: true })} placeholder="Title" className="rembourssement-form-input" />
            {errors.title && <p>Title is required</p>}
          </div>
          <div>
            <label htmlFor="description" className="rembourssement-form-label">Description:</label>
            <textarea {...register('description')} placeholder="Description" className="rembourssement-form-input" />
          </div>
          <div>
            <label htmlFor="authorization_number" className="rembourssement-form-label">Authorization Number:</label>
            <input {...register('authorization_number', { required: true })} placeholder="Authorization Number" className="rembourssement-form-input" />
            {errors.authorization_number && <p>Authorization Number is required</p>}
          </div>
          <div>
            <label htmlFor="amount" className="rembourssement-form-label">Amount:</label>
            <input {...register('amount', { required: true, pattern: /^\d+(\.\d{1,2})?$/ })} placeholder="Amount" className="rembourssement-form-input" />
            {errors.amount && <p>Invalid amount format (e.g., 100.00)</p>}
          </div>
          <div>
            <label htmlFor="merchant_number" className="rembourssement-form-label">Merchant Number:</label>
            <input {...register('merchant_number', { required: true })} placeholder="Merchant Number" className="rembourssement-form-input" />
            {errors.merchant_number && <p>Merchant Number is required</p>}
          </div>
          <div>
            <label htmlFor="merchant_email" className="rembourssement-form-label">Merchant Email:</label>
            <input {...register('merchant_email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} placeholder="Merchant Email" className="rembourssement-form-input" />
            {errors.merchant_email && <p>Invalid email format</p>}
          </div>
          <div>
            <label htmlFor="merchant_name" className="rembourssement-form-label">Merchant Name:</label>
            <input {...register('merchant_name')} placeholder="Merchant Name" className="rembourssement-form-input" />
          </div>
          <div>
            <label htmlFor="status" className="rembourssement-form-label">Status:</label>
            <select {...register('status')} className="rembourssement-form-input">
              <option value="created">Created</option>
              <option value="sent_to_merchant">Sent to Merchant</option>
              <option value="processing_by_SMT">Processing by SMT</option>
              <option value="processing_by_bank">Processing by Bank</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
              <option value="desactivated">Deactivated</option>
              <option value="reactivate">Reactivate</option>
            </select>
          </div>
          <div>
            <label htmlFor="reason" className="rembourssement-form-label">Reason:</label>
            <textarea {...register('reason')} placeholder="Reason" className="rembourssement-form-input" />
          </div>
          <div>
            <label htmlFor="assignedTo" className="rembourssement-form-label">Assign To:</label>
            <select {...register('assignedTo')} className="rembourssement-form-input">
              <option value="">Select a User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>{user.email}</option>
              ))}
            </select>
          </div>

          <div className="rembourssement-btn-container">
            <button type="submit" className="rembourssement-btn-ajouter">Modifier Rembourssement</button>
            <button type="button" className="rembourssement-btn-annuler" onClick={() => navigate(-1)}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRembourssement;

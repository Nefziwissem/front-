import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AxiosInstance from './Axios'; 
import { useNavigate, useParams } from 'react-router-dom';
import './Edit.css'; 

const EditUser = () => {
  const { id: userId } = useParams();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const rolesResponse = await AxiosInstance.get('/api/v1/users/roles/');
        setRoles(rolesResponse.data);
        const userResponse = await AxiosInstance.get(`/api/v1/users/users/${userId}/`);
        setValue('first_name', userResponse.data.first_name);
        setValue('last_name', userResponse.data.last_name);
        setValue('email', userResponse.data.email);
        setValue('phone_number', userResponse.data.phone_number);
        setValue('role', userResponse.data.roles.map(role => role.id));
        setValue('is_active', userResponse.data.is_active);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [userId, setValue]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      roles: data.role ? [parseInt(data.role)] : [],
      is_active: data.is_active,
    };

    try {
      await AxiosInstance.put(`/api/v1/users/update/${userId}/`, payload);
      navigate('/home');
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  if (loading) {
    return <p>Loading user data...</p>;
  }

  return (
    <section className="section-style">
      <div className="image-container"></div>
      <div className="form-container">
        <h2 className="section-title">Modifier utilisateur</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="first_name" className="form-label">Nom:</label>
            <input {...register('first_name')} placeholder="Nom" className="form-input" />
            {errors.first_name && <p>{errors.first_name.message}</p>}
          </div>
          <div>
            <label htmlFor="last_name" className="form-label">Prénom:</label>
            <input {...register("last_name")} placeholder="Prénom" className="form-input" />
            {errors.last_name && <p>{errors.last_name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="form-label">Email:</label>
            <input {...register('email')} placeholder="Email" className="form-input" />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="phone_number" className="form-label">Numéro de téléphone</label>
            <input {...register('phone_number')} placeholder="Numéro de téléphone" className="form-input" />
            {errors.phone_number && <p>{errors.phone_number.message}</p>}
          </div>
          <div>
            <label htmlFor="role" className="form-label">Role:</label>
            <select {...register('role')} className="form-input">
              {roles.map((role) => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="is_active" className="form-label">Active Status:</label>
            <input type="checkbox" {...register('is_active', { valueAsBoolean: true })} />
          </div>
          <div className="btn-container">
            <button type="submit" className="btn-ajouter">Modifier utilisateur </button>
            <button type="button" className="btn-annuler" onClick={() => navigate(-1)}>Annuler</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditUser;

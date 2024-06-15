import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, IconButton, Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from '../Axios';
import myEditIcon from '../eee.png';
import myDeactivateIcon from '../rt.png';
import myReactivateIcon from './icon7.png';
import './RembourssementHome.css';





const RembourssementsHome = () => {
  const [rembourssements, setRembourssements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/rembourssements/');
      setRembourssements(response.data);
    } catch (error) {
      console.error('Error retrieving rembourssements:', error.response || error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleToggleActiveStatus = async (rembourssement) => {
    const url = `http://localhost:8000/api/v1/rembourssements/${rembourssement.id}/toggle-active/`;

    try {
      const response = await axios.patch(url);
      if (response.status === 200) {
        const updatedRembourssements = rembourssements.map(rb => {
          if (rb.id === rembourssement.id) {
            return { ...rb, is_active: !rb.is_active };
          }
          return rb;
        });
        setRembourssements(updatedRembourssements);
      } else {
        console.error('Failed to toggle active status:', response);
        alert('Failed to toggle active status. Please try again.');
      }
    } catch (error) {
      console.error('Error toggling active status:', error);
      alert('Failed to toggle active status. Please try again.');
    }
  };

  const filteredRembourssements = rembourssements.filter(rembourssement =>
    rembourssement.authorization_number?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="home-container">
      <div className="title-and-button-container">
        <h2 className="page-title">Rembourssements</h2>
        <TextField
          variant="outlined"
          placeholder="Search by Authorization Number..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="search-input"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={{ marginRight: 20 }}
        />
        <Button variant="contained" color="primary" onClick={() => navigate('/rembourssements/create/')}>
          + Add Rembourssement
        </Button>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Authorization Number</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Creation Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRembourssements.map((rembourssement) => (
              <tr key={rembourssement.id}>
                <td>
                  <Link to={`/rembourssements/${rembourssement.id}`}>{rembourssement.id}</Link>
                </td>
                <td>{rembourssement.authorization_number}</td>
                <td>{rembourssement.amount}</td>
                <td style={{ color: rembourssement.is_active ? 'black' : 'red' }}>
                  {rembourssement.status} {rembourssement.is_active ? '' : '(Deactivated)'}
                </td>
                <td>{new Date(rembourssement.creation_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                <td>
                  <Box className="icon-container">
                    <IconButton component={Link} to={`/rembourssements/${rembourssement.id}/edit`} className="edit-button">
                      <img src={myEditIcon} alt="Edit" />
                    </IconButton>
                    <IconButton onClick={() => handleToggleActiveStatus(rembourssement)} className={rembourssement.is_active ? 'deactivate-button' : 'reactivate-button'}>
                      <img src={rembourssement.is_active ? myDeactivateIcon : myReactivateIcon} alt={rembourssement.is_active ? "Deactivate" : "Reactivate"} />
                    </IconButton>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RembourssementsHome;


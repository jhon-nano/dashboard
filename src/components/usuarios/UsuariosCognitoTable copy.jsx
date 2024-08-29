import React, { useState, useEffect } from 'react';
import { API, Auth } from 'aws-amplify';

const AddAttributeForm = ({ onAddAttribute }) => {
  const [attributeName, setAttributeName] = useState('');
  const [attributeValue, setAttributeValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAttribute(attributeName, attributeValue);
    setAttributeName('');
    setAttributeValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Agregar Atributo</h3>
      <input
        type="text"
        placeholder="Nombre del Atributo"
        value={attributeName}
        onChange={(e) => setAttributeName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Valor del Atributo"
        value={attributeValue}
        onChange={(e) => setAttributeValue(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
};

const ManageUser = ({ username }) => {
  const [status, setStatus] = useState(null);
  const [allGroups, setAllGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {

        const apiName = 'AdminQueries';
        const listGroupsPath = '/listGroups';
        const listGroupsForUserPath = '/listGroupsForUser';

        const myInit = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
          },
        };

        const [groupsResponse, userGroupsResponse] = await Promise.all([
          API.get(apiName, listGroupsPath, myInit),
          API.get(apiName, listGroupsForUserPath, {
            ...myInit,
            queryStringParameters: {
              username,
            },
          }),
        ]);

        setAllGroups(groupsResponse.Groups);
        setUserGroups(userGroupsResponse.Groups);
      } catch (error) {
        console.error('Error fetching groups', error);
        setStatus('Error fetching groups');
      }
    };

    fetchGroups();
  }, [username]);

  const handleAddAttribute = async (attributeName, attributeValue) => {
    try {

      const apiName = 'AdminQueries';
      const path = '/addUserAttributes';
      const myInit = {
        body: {
          username,
          attributes: [
            {
              Name: attributeName,
              Value: attributeValue,
            },
          ],
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        },
      };
      await API.post(apiName, path, myInit);
      setStatus(`Attribute ${attributeName} added successfully`);
    } catch (error) {
      console.error('Error adding attribute', error);
      setStatus(`Error adding attribute ${attributeName}`);
    }
  };

  const handleAPIRequest = async (path, method = 'GET', body = null) => {
    try {

      const apiName = 'AdminQueries';
      const myInit = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
        },
      };

      if (body) {
        myInit.body = body;
      }

      const response = await API[method.toLowerCase()](apiName, path, myInit);
      return response;
    } catch (error) {
      console.error(`Error calling ${path}`, error);
      setStatus(`Error calling ${path}`);
    }
  };

  const handleAddToGroup = async (groupName) => {
    if (!allGroups.find(group => group.GroupName === groupName)) {
      setStatus(`Group ${groupName} does not exist`);
      return;
    }

    if (userGroups.find(group => group.GroupName === groupName)) {
      setStatus(`User ${username} is already in group ${groupName}`);
      return;
    }

    await handleAPIRequest('/addUserToGroup', 'POST', { username, groupname: groupName });
    setStatus(`User ${username} added to group ${groupName}`);
    setUserGroups([...userGroups, { GroupName: groupName }]);
  };

  const handleRemoveFromGroup = async (groupName) => {
    await handleAPIRequest('/removeUserFromGroup', 'POST', { username, groupname: groupName });
    setStatus(`User ${username} removed from group ${groupName}`);
    setUserGroups(userGroups.filter(group => group.GroupName !== groupName));
  };


  const handleDisableUser = async () => {
    await handleAPIRequest('/disableUser', 'POST', { username });
    setStatus(`User ${username} disabled`);
  };

  const handleEnableUser = async () => {
    await handleAPIRequest('/enableUser', 'POST', { username });
    setStatus(`User ${username} enabled`);
  };

  const handleSignOutUser = async () => {
    await handleAPIRequest('/signUserOut', 'POST', { username });
    setStatus(`User ${username} signed out`);
  };

  return (
    <div>
      <h2>Gestionar Usuario: {username}</h2>
      <AddAttributeForm onAddAttribute={handleAddAttribute} />
      <h3>Grupos del Usuario</h3>
      <ul>
        {userGroups.map(group => (
          <li key={group.GroupName}>
            {group.GroupName}
            <button onClick={() => handleRemoveFromGroup(group.GroupName)}>Remove</button>
          </li>
        ))}
      </ul>
      <select onChange={(e) => handleAddToGroup(e.target.value)} defaultValue="">
        <option value="" disabled>Select a group to add</option>
        {allGroups.map(group => (
          <option key={group.GroupName} value={group.GroupName}>
            {group.GroupName}
          </option>
        ))}
      </select>
   
      <button onClick={handleDisableUser}>Disable User</button>
      <button onClick={handleEnableUser}>Enable User</button>
      <button onClick={handleSignOutUser}>Sign Out User</button>
      {status && <p>{status}</p>}
    </div>
  );
};

const UserDetails = ({ username }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(username)
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {

        const apiName = 'AdminQueries';
        const path = '/getUser';
        const myInit = {
          queryStringParameters: {
            username: username,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
          },
        };
        const response = await API.get(apiName, path, myInit);
        console.log(response)
        setUserDetails(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details', error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [username]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Detalles del Usuario: {username}</h1>
      {userDetails && (
        <div>
          <p>Email: {userDetails.UserAttributes.find(attr => attr.Name === 'email').Value}</p>
          <p>Status: {userDetails.UserStatus}</p>
          {/* Agrega más detalles del usuario según sea necesario */}
        </div>
      )}
    </div>
  );
};

const ListUsers = ({ onUserClick }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const listUsers = async () => {
      try {

        const apiName = 'AdminQueries';
        const path = '/listUsers';
        const myInit = {
          queryStringParameters: {
            limit: 10,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
          },
        };
        const response = await API.get(apiName, path, myInit);
        setUsers(response.Users);
      } catch (error) {
        console.error('Error listing users', error);
      }
    };

    listUsers();
  }, []);

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user.Username} onClick={() => onUserClick(user)}>
            {user.Username}
          </li>
        ))}
      </ul>
    </div>
  );
};

const UserManagement = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  console.log(selectedUser);
  const handleUserClick = (username) => {
    setSelectedUser(username);
  };

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      <ListUsers onUserClick={handleUserClick} />
      {selectedUser && (
        <div>
          <UserDetails selectedUser={selectedUser} username={selectedUser.Username} />
          <ManageUser username={selectedUser.Username} />
        </div>
      )}
    </div>
  );
};

export default UserManagement;

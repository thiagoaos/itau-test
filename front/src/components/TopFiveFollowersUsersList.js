import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import useStyles from 'styles';

export function TopFiveFollowersUsersList({}) {
  const classes = useStyles();

  const [hasError, setErrors] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://itau-test.herokuapp.com/api/v1/users/top5-followers");
      res.json()
        .then(data => setUsers(data))
        .catch(err => setErrors(err));
    }

    fetchData();
  }, []);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="top five users table">
        <TableHead>
          <TableRow>
            <TableCell>Usuário</TableCell>
            <TableCell align="right">Seguidores</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.name}>
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="right">{user.followers}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
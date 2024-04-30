import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './LoginPage'; // Importe seu componente de login
import HomePage from './HomePage'; // Importe a página inicial ou outra página protegida

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={HomePage} />
        {/* Defina outras rotas conforme necessário */}
      </Switch>
    </Router>
  );
}
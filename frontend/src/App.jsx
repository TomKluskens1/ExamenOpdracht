import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthPage from './components/AuthPage'; 
import Dashboard from './components/Dashboard';
import AddRecipe from './components/AddRecipe';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="main-content">
          <Routes>
            {/* Route for the main page with the list of recipes */}
            <Route path="/" element={<RecipeList />} />

            {/* Dynamic route for the details of a specific recipe */}
            <Route path="/recipe/:id" element={<RecipeDetails />} />

            {/* Route voor de inlog/registratie pagina */}
            <Route path="/signup" element={<AuthPage />} />
            {/* Route voor het dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addrecipe" element={<AddRecipe />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

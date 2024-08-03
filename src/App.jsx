import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import AddProduct from './pages/addProduct/AddProduct';
import UpdateProduct from './pages/updateProduct/UpdateProduct';
import MyState from './context/MyState';
function App() {
  const route = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/addproduct',
      element: <AddProduct />,
    },
    {
      path: '/updateproduct',
      element: <UpdateProduct />,
    },
  ]);

  return (
    <>
    <MyState>    
      <RouterProvider router={route} />
    </MyState>
    </>
  );
}

export default App;

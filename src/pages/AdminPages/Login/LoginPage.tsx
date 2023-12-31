import { useNavigate } from 'react-router-dom';
import FormLogin from '../../../components/Admin/FormLogin';
import { useAuthStore } from '../../../store/authStore';
import { Alert } from 'react-bootstrap';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

function LoginPage() {
  const { isError, isSuccess, userInfo, removeToken } = useAuthStore();
  const role = userInfo.role_id;
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.email !== '' && isSuccess) {
      navigate('/admin/dashboard');
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          if (role === 3) {
            removeToken();
            navigate('/');
            return;
          }
          navigate('/admin/dashboard');
        },
      });
      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully',
      });
    }
  }, [isSuccess, userInfo]);

  return (
    <div>
      <div className="row min-vh-100 vw-100 ">
        <div className="col-7 ">
          <div
            className="img bg-primary"
            style={{ height: '100%', width: '100%' }}
          ></div>
        </div>
        <div className="col-5  ">
          <div style={{ padding: '300px 55px' }}>
            <h2 className="fw-bold text-primary mt-3">Car Rent</h2>
            <h2 className="fw-bold" style={{ marginTop: '32px' }}>
              Welcome, Admin
            </h2>
            {isError && (
              <Alert variant="danger" className="mt-4">
                <Alert.Heading>{isError}</Alert.Heading>
                <p>
                  Masukkan username dan password dengan benar. Perhatikan
                  penggunaan huruf kapital.
                </p>
              </Alert>
            )}
            <FormLogin />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

import { useNavigate, useSearchParams } from "react-router-dom";
import { signInWithGoogle } from "../../utils/firebase";
import { Button, Space, Alert, Modal } from "antd";
import { BorderTopOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useIsAuthenticated } from "../../state/user";

export function Login() {
  const [error, setError] = useState<{
    message: string;
    description: string;
  } | null>(null);
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from") || undefined;
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from || "/");
    }
  }, [isAuthenticated, from, navigate]);

  const handleSignIn = async () => {
    const authResult = await signInWithGoogle();
    if (!authResult) {
      setError({
        message: "Oops...",
        description: "Something went wrong. Please try again later!",
      });
    } else {
      navigate(from || "/");
    }
  };

  return (
    <>
      <Modal
        title="Login"
        open={true}
        okButtonProps={{ style: {display: "none"} }}
        cancelButtonProps={{ style: {display: "none"} }}
        closable={false}
      >
        {error && (
          <Alert
            message={error.message}
            description={error.description}
            type="error"
            closable
            onClose={() => setError(null)}
          />
        )}
        <Space>
          <p>Please log in</p>
          <Button
            type="primary"
            onClick={handleSignIn}
            icon={<BorderTopOutlined />}
          >
            Sign In
          </Button>
        </Space>
      </Modal>
    </>
  );
}

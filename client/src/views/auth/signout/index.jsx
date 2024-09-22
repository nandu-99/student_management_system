import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner, Text } from '@chakra-ui/react';

const SignOut = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
        const timer = setTimeout(() => {
            setLoading(false);
            navigate('/auth/sign-in');
        }, 1000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <Spinner size="xl" />
            <Text fontSize="lg" mt={4}>Signing Out...</Text>
        </div>
    );
};

export default SignOut;

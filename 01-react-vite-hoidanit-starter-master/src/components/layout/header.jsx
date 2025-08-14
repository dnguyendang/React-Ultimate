// import './header.css'
import { Link, NavLink } from 'react-router-dom';
import { UserOutlined, HomeOutlined, BookOutlined, SettingOutlined, LoginOutlined, AliwangwangOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';


const Header = () => {

    const [current, setCurrent] = useState('');

    const { user } = useContext(AuthContext);

    console.log(">>>> check user ", user);

    const onClick = e => {
        setCurrent(e.key);
    };

    const items = [
        {
            label: <Link to="/">Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to="/users">Users</Link>,
            key: 'users',
            icon: <UserOutlined />
        },
        {
            label: <Link to="/books">Books</Link>,
            key: 'books',
            icon: <BookOutlined />
        },

        ...(!user.id ? [
            {
                label: <Link to={"/login"}>Đăng nhấp</Link>,
                key: 'login',
                icon: <LoginOutlined />
            }
        ] : [
            {
                label: `Welcome ${user.fullName} `,
                key: 'setting',
                icon: <AliwangwangOutlined />,
                children: [
                    {
                        label: 'Đăng xuất',
                        key: 'logout',
                    },
                ],
            }
        ]),
    ];

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items} />
    )
}

export default Header;
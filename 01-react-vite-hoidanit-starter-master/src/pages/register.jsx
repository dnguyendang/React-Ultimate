
import { Button, Form, Input } from 'antd'

const RegisterPage = () => {
    const [form] = Form.useForm()
    const onFinish = (values) => {
        console.log(">>> check : ", values)
    }
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
        >
            <div style={{ margin: "50px" }}>
                <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your full name!'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!'
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[
                        {
                            pattern: new RegExp(/\d+/g),
                            message: 'Wrong format!'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <div>
                    <Button
                        type='primary'
                        onClick={() => form.submit()}
                    >Register</Button>
                </div>
            </div>
        </Form>
    )
}

export default RegisterPage;
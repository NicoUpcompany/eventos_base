import React, { useState, useEffect } from "react";
import { notification, Spin, Table, Input, Space, Button, ConfigProvider } from 'antd';
import es_ES from 'antd/es/locale/es_ES';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import jwtDecode from 'jwt-decode';
import XLSX from 'xlsx';
import { ExportSheet } from 'react-xlsx-sheet';

import { getUsersApi } from '../../../api/user';
import { getQuestionApi } from '../../../api/question';
import { getAccessTokenApi } from '../../../api/auth';

import up from '../../../assets/img/dashboard/up.png';
import up5 from '../../../assets/img/dashboard/5.png';

const userHeaders = [
    { title: 'ID', dataIndex: '_id' },
    { title: 'Nombre Completo', dataIndex: 'fullName' },
    { title: 'Correo', dataIndex: 'email' },
    { title: 'Cargo', dataIndex: 'position' },
    { title: 'Empresa', dataIndex: 'enterprise' },
    { title: 'Rol', dataIndex: 'role' },
    { title: 'Día y hora de registro', dataIndex: 'signUpTime' },
    { title: 'Último inicio de sesión', dataIndex: 'signInTime' },
    { title: 'Última conexión stream', dataIndex: 'streamTime' }
];

const questionHeaders = [
    { title: 'ID', dataIndex: '_id' },
    { title: 'Nombre usuario', dataIndex: 'name' },
    { title: 'Pregunta', dataIndex: 'question' },
];

let searchInput = "";

const Dashboard = () => {

    const [loading, setLoading] = useState(false);
    const [signInCount, setSignInCount] = useState(0);
    const [singUpCount, setSingUpCount] = useState(0);
    const [streamCount, setStreamCount] = useState(0);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [usersData, setUsersData] = useState([]);
    const [questionData, setQuestionData] = useState([]);

    useEffect(() => {
        try {
            setLoading(true);
            let interval;
            const token = getAccessTokenApi();
            if (token === null) {
                window.location.href = "/dashboard";
            } else {
                const decodedToken = jwtDecode(token);
                if (decodedToken.role !== 'Admin') {
                    window.location.href = "/dashboard";
                } else {
                    interval = setInterval(() => {
                        getUsers(token);
                        getQuestions(token);
                    }, 5000);
                }
            }
            return () => clearInterval(interval);
        } catch (error) {
            window.location.href = "/dashboard";
        }
    }, []);

    const getUsers = async (token) => {
        let signUp = 0;
        let signIn = 0;
        let stream = 0;
        await getUsersApi(token).then(resp => {
            const arrayUsers = [];
            if (!resp.ok) {
                notification["error"]({
                    message: resp.message
                });
            } else {
                signUp = resp.users.length;
                resp.users.forEach(item => {
                    if (item.signInTime !== '0') {
                        signIn = signIn + 1;
                    }
                    if (item.streamTime !== '0') {
                        stream = stream + 1;
                    }
                    const element = {
                        ...item,
                        key: item._id
                    }
                    arrayUsers.push(element);
                });
            }
            setUsersData(arrayUsers);
            setSingUpCount(signUp);
            setSignInCount(signIn);
            setStreamCount(stream);
            setLoading(false);
        });
    }

    const getQuestions = async (token) => {
        await getQuestionApi(token).then(resp => {
            const arrayQuestions = [];
            resp.preguntas.forEach(item => {
                arrayQuestions.push(item);
            });
            setQuestionData(arrayQuestions);
            setLoading(false);
        });
    }

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={'Buscar'}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Buscar
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Limpiar
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
            onFilterDropdownVisibleChange: visible => {
                if (visible) {
                    setTimeout(() => searchInput.select(), 100);
                }
            },
            render: text =>
                searchedColumn === dataIndex ? (
                    <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ''}
                    />
                ) : (
                    text
                ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    };

    const columns = [
        {
            title: 'Correo',
            dataIndex: 'email',
            key: 'email',
            fixed: 'left',
            width: 150,
            ...getColumnSearchProps('email'),
        },
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            width: 150,
            ...getColumnSearchProps('_id'),
        },
        {
            title: 'Nombre Completo',
            dataIndex: 'fullName',
            key: 'fullName',
            width: 150,
            ...getColumnSearchProps('fullName'),
        },
        {
            title: 'Cargo',
            dataIndex: 'position',
            key: 'position',
            width: 150,
            ...getColumnSearchProps('position'),
        },
        {
            title: 'Empresa',
            dataIndex: 'enterprise',
            key: 'enterprise',
            width: 150,
            ...getColumnSearchProps('enterprise'),
        },
        {
            title: 'Rol',
            dataIndex: 'role',
            key: 'role',
            width: 150,
            filters: [
                {
                    text: 'Administrador',
                    value: 'Admin',
                },
                {
                    text: 'Usuario',
                    value: 'User',
                }
            ],
            onFilter: (value, record) => record.role.indexOf(value) === 0
        },
        {
            title: 'Día y hora de registro',
            dataIndex: 'signUpTime',
            key: 'signUpTime',
            width: 150,
            sorter: (a, b) => a.signUpTime.length - b.signUpTime.length,
        },
        {
            title: 'Último inicio de sesión',
            dataIndex: 'signInTime',
            key: 'signInTime',
            width: 150,
            sorter: (a, b) => a.signInTime.length - b.signInTime.length,
        },
        {
            title: 'Última conexión stream',
            dataIndex: 'streamTime',
            key: 'streamTime',
            width: 150,
            sorter: (a, b) => a.streamTime.length - b.streamTime.length,
        },
    ];

    const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

    return (
        <ConfigProvider locale={es_ES}>
            <Spin spinning={loading} size="large" tip="Cargando..." indicator={antIcon}>
                <div className="dashboard">
                    <div className="header">
                        <div className="contenedor">
                            <div className="logo"><img src={up} alt="up" width="23"/></div>
                        </div>
                    </div>
                    <div className="contenedor">
                        <div className="row">
                            <div className="mid mid-l">
                                <div className="data">
                                <div>
                                    <div className="box">
                                        <div className="icon ico1"></div>
                                        {singUpCount}
                                        <span>Registrados</span>
                                    </div>
                                    <div className="box">
                                        <div className="icon ico2"></div>
                                        {signInCount}
                                        <span>Iniciaron sesión</span>
                                    </div>
                                    <div className="box">
                                        <div className="icon ico4"></div>
                                        {streamCount}
                                        <span>Sala streaming</span>
                                    </div>
                                </div>
                                </div>
                                <div className="box-la">
                                    <div className="list">
                                        <Table columns={columns} dataSource={usersData} bordered pagination={true} scroll={{ x: '70vw', y: 240 }} />
                                    </div>
                                </div>
                                <div className="btns">
                                    <ExportSheet
                                        header={userHeaders}
                                        fileName={`lista_usuarios`}
                                        dataSource={usersData}
                                        xlsx={XLSX}
                                    >
                                        <button className="btn" style={{cursor: 'pointer'}}>Exportar participantes<img src={up5} alt="Exportar participantes" width="15"/></button>
                                    </ExportSheet>
                                    <ExportSheet
                                        header={questionHeaders}
                                        fileName={`lista_preguntas`}
                                        dataSource={questionData}
                                        xlsx={XLSX}
                                    >
                                        <button className="btn">Exportar preguntas<img src={up5} alt="Exportar preguntas" width="15"/></button>
                                    </ExportSheet>
                                </div>
                                
                            </div>
                            <div className="mid mid-s">
                                <div className="cont-preguntas">
                                    <h3>Preguntas</h3>
                                    <div className="preguntas-list">
                                        {questionData.map((item, i) => {
                                            return (
                                                <p key={i}><strong>{item.name}</strong>{item.question}</p>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
        </ConfigProvider>
    )
}

export default Dashboard;
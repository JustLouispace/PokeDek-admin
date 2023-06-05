import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Input, Space, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const RequestList = () => {
    const columns = [
        {
            title: 'SNo',
            dataIndex: 'key',
            sorter: (a, b) => a.key - b.key,
        },
        {
            title: 'Name',
            dataIndex: 'title',
            sorter: (a, b) => a.title.length - b.title.length,
        },
        {
            title: 'Supertype',
            dataIndex: 'supertype',
            sorter: (a, b) => {
                const supertypeA = a.supertype || '';
                const supertypeB = b.supertype || '';
                return supertypeA.length - supertypeB.length;
            },
        },
        {
            title: 'Subtypes',
            dataIndex: 'subtypes',
            sorter: (a, b) => {
                const subtypesA = a.subtypes || '';
                const subtypesB = b.subtypes || '';
                return subtypesA.length - subtypesB.length;
            },
        },
        {
            title: 'Hp',
            dataIndex: 'hp',
            sorter: (a, b) => a.hp - b.hp,
        },
        {
            title: 'Types',
            dataIndex: 'types',
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'EvolvesFrom',
            dataIndex: 'evolvesfrom',
            sorter: (a, b) => a.hp - b.hp,
        },
        {
            title: 'Images',
            dataIndex: 'images',
            render: (images) => (
                <Space size="middle">
                    {images.map((image, index) => (
                        <img key={index} src={image} alt="Card" style={{ width: '50px' }} />
                    ))}
                </Space>
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleClick(record.id)}>
                        Edit
                    </Button>
                    <Button type="danger" onClick={() => handleDelete(record.id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleClick = (id) => {
        console.log('Request id:', id);
        navigate(`/admin/update-Request/${id}`);
    };

    const handleDelete = (id) => {
        console.log('delete:', id);
        if (id) {
            axios
                .delete(`http://localhost:5000/api/Request/${id}`)
                .then(() => {
                    // Perform any necessary actions after successful deletion
                    console.log('Successfully deleted');
                    fetchData(); // Fetch data again after deletion
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/Request');
            console.log(response.data);
            const formattedData = response.data.map((item, index) => ({
                key: index + 1,
                id: item._id,
                title: item.name,
                supertype: item.supertype,
                subtypes: item.subtypes,
                hp: item.hp,
                types: item.types,
                evolvesfrom: item.evolvesFrom,
                images: item.images.map((image) => image.url),
            }));
            setRequests(formattedData);
        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const filteredRequests = requests.filter((request) =>
        request.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Input.Search
                placeholder="Search..."
                onChange={(e) => handleSearch(e.target.value)}
                style={{ marginBottom: '16px', width: '300px' }}
            />
            <Table dataSource={filteredRequests} columns={columns} />
        </div>
    );
};

export default RequestList;

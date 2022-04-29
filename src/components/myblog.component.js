
import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { CustomerService } from '../services/CustomerService';
import { BlogService } from '../services/blog.service';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import '../styles/PrimeReact.css';
import '../styles/DataTableDemo.css';
import { useNavigate } from 'react-router-dom';

const MyBlog = () => {
    // const [customers, setCustomers] = useState(null);
    const [myblog, setMyBlog] = useState(null);
    // const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [selectedBlogs, setSelectedBlogs] = useState(null);
    const toast = useRef(null);
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'blogTitle': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        // 'representative': { value: null, matchMode: FilterMatchMode.IN },
        'date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        'username' : {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]}
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);
    const blogService = new BlogService();
    const navigate  =useNavigate();
    useEffect(() => {
        // console.log(blogService.getMyBlog());
        blogService.getMyBlog()
        .then(data => {setMyBlog(getMyBlog(data)); setLoading(false)})
    }, []);
    

    const getCustomers = (data) => {
        return [...data || []].map(d => {
            d.date = new Date(d.date);
            return d;
        });
    }

    const getMyBlog = (data) => {
        return [...data || []].map(
            d => {
                d.date = new Date(d.createdAt);
                return d;
            }
        );
    }

    const formatDate = (value) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    }

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between align-items-center">
                <h5 className="m-0">Customers</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        )
    }

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.date);
    }

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
    }


    const activityBodyTemplate = (rowData) => {
        return <ProgressBar value={rowData.activity} showValue={false}></ProgressBar>;
    }


    const actionBodyTemplate = (rowData) => {
        return <div><Button type="button" icon="pi pi-pencil" id={rowData.blogId} onClick={handleEditButton}></Button></div>;
        
    }

    const handleEditButton = (e) => {
        if(e.target.id) {
            console.log(e.target.id);
            navigate("/blog/edit/"+e.target.id);
        }
    }

    const deleteBodyTemplate = (rowData) => {
        // console.log(rowData);
        return <div><Button type="button" icon="pi pi-trash" className='p-button-danger' onClick={confirmDelete} id={rowData.blogId}></Button></div>; 
        // <Button onClick={() => setVisible(true)} icon="pi pi-check" label="Confirm" />
    }

    const deleteAction = (blogId) => {
        if(blogId) {
            blogService.deleteBlog(blogId).then(
                response => {
                    if(response.message) {
                        console.log(response.message);
                        toast.current.show({ severity: 'error', summary: 'Confirmed', detail: 'You have deleted a blog', life: 3000 });
                    }
                }
            ).catch(error => {
                console.log(error);
                toast.current.show({ severity: 'warn', summary: 'Confirmed', detail: 'Error Deleting Blog', life: 3000 })
            });
            setMyBlog(myblog.filter(blog => { 
                return blog.blogId !== parseInt(blogId);
            }));
        }
    }

    const confirmDelete = (e) => {
        if(e.target.id) {
            confirmDialog({
                message: 'Are you sure you want to delete this record?',
                header: 'Delete Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => acceptDelete(e.target.id),
                reject: () => toast.current.show({ severity: 'info', summary: 'Rejected', detail: 'You have rejected', life: 3000 })
            });
        }
    }

    const acceptDelete = (blogId) => {
        if(blogId) {
            deleteAction(blogId)
            
        }
    }

    const viewBodyTemplate = (rowData) => {
        return <div><Button type="button" icon="pi pi-eye" className='p-button-info' onClick={handleViewButton} id={rowData.blogId}></Button></div>; 
    }

    const handleViewButton = (e) => {
        redirectView(e.target.id);
    }

    const handleRowClick = (e) => {
        redirectView(e.data.blogId);
    }

    const redirectView = (blogId) => {
        if(blogId) {
            console.log(blogId);
            navigate("/blog/view/"+blogId);
        }
    } 
    

    const header = renderHeader();

    return (
        <div className="datatable-doc-demo">
            <div className="card">
                <DataTable value={myblog} paginator className="p-datatable-customers" header={header} rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}
                    dataKey="blogId" rowHover selection={selectedBlogs} onSelectionChange={e => setSelectedBlogs(e.value)} onRowClick={handleRowClick}
                    filters={filters} filterDisplay="menu" loading={loading} responsiveLayout="scroll"
                    globalFilterFields={['blogTitle', 'country.name', 'representative.name', 'balance', 'status', 'username']} emptyMessage="No customers found."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                    
                    {/* <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column> */}
                    <Column field="blogTitle" header="Blog Title" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '15rem' }} />
                    <Column field="username" header="Username" sortable filter style={{ minWidth: '5rem' }} />
                    <Column field="date" header="Created Date" sortable filterField="date" dataType="date" style={{ minWidth: '8rem' }} body={dateBodyTemplate}
                        filter filterElement={dateFilterTemplate} />
                    <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={viewBodyTemplate} />
                    <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                    <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={deleteBodyTemplate} />
                </DataTable>
                <ConfirmDialog />
                <Toast ref={toast} />
            </div>
        </div>
    );
}

export default MyBlog;
                 
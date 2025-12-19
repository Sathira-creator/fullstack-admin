import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useGetTransactionsQuery } from 'state/api';
import Header from 'components/Header';
import { Box, Toolbar, useTheme } from '@mui/material';
import DataGridCustomToolbar from 'components/DataGridCustomToolbar';

const Transactions = () => {
    const theme = useTheme();

    // Change state initialization
    const [paginationModel, setPaginationModel] = useState({ 
        page: 0, 
        pageSize: 20 
    });
    // Destructure for RTK Query call
    const { page, pageSize } = paginationModel;

    
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const { data, isLoading } = useGetTransactionsQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search,
    });

    console.log("pageState:", page);

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "userId",
            headerName: "User ID",
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "CreatedAt",
            flex: 1,
        },
        {
            field: "products",
            headerName: "# of Products",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => params.value.length,
        },
        {
            field: "cost",
            headerName: "Cost",
            flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
        },
        
    ]
  return ( 
    <Box m="1.5rem 2.5rem">
        <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
        <Box mt="40px" height="75vh" width="143vh"
            sx={{
                "& .MuiDataGrid-root": {
                    border: "none"
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none"
                },
                
                "& .MuiDataGrid-columnHeader, & .MuiDataGrid-columnHeaderTitle": {
                    // Ensures individual column background color is applied
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                },
                "& .MuiDataGrid-footerContainer": {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderTop: "none"
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${theme.palette.secondary[200]} !important`,
                },
            }}
        >
            <DataGrid
                loading={isLoading || !data}
                getRowId={(row) => row._id}
                rows={data?.transactions || []}
                columns={columns}
                rowCount={data?.total || 0}
                
                pagination
                page={page}
                pageSize={pageSize}
                paginationMode='server'
                sortingMode='server'
                onPaginationModelChange={(newPage) => setPaginationModel(newPage)}
                
                onSortModelChange={(newSortModel) => setSort(...newSortModel)}
                slots={{ toolbar: DataGridCustomToolbar }}
                slotProps={{
                    toolbar: { searchInput, setSearchInput, setSearch }
                }}
                showToolbar
            />
        </Box>
    </Box>
  )
}

export default Transactions

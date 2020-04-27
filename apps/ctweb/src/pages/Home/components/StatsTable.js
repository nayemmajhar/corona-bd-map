import React from 'react'
import styled from 'styled-components'
import { useTable, useSortBy, usePagination } from 'react-table'

const Styles = styled.div`
  padding: 9px;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }

    td {
        padding:5px;
    }
  }

  .pagination {
    padding: 0.5rem;
    font-size: 12px;
    vertical-align:middle;

    .page-index{
        margin:0 10px;
        line-height: 24px;
    }
  }
  
`

function Table({ columns, data, }) {
  const {
    getTableProps,
    getTableBodyProps,
    headers,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
        columns,
        data,
        initialState: { 
            pageIndex: 0,
            pageSize: 20
        },
    },
    useSortBy,
    usePagination
  )

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          <tr>
              {headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td className={ !Number.isInteger(cell.value) || cell.value > 0?cell.column.id:'case-numeric'} {...cell.getCellProps()}>
                        { cell.render('Cell') }
                    </td>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
      </table>
      {
          data.length > 19 &&
          <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
            </button>{' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
            </button>{' '}
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
            </button>{' '}
            <span className="page-index">
            Page{' '}
            <strong>
                {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
            </span>
            <select
            value={pageSize}
            onChange={e => {
                setPageSize(Number(e.target.value))
            }}
            >
            {[20, 40, 64].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                Show {pageSize}
                </option>
            ))}
            </select>
        </div>
      }
      
    </>
  )
}

const columns = [{ 
    Header: 'Name', 
    accessor: 'title' 
    },{ 
    Header: 'Total Cases', 
    accessor: 'infected' 
    },{ 
    Header: 'New Cases', 
    accessor: 'newinfected' 
}] 

class StatsTable extends React.Component {
    render(){
        return (
            <Styles>
                <Table columns={columns} data={this.props.cases} />
            </Styles>
        )
    }
}

export default StatsTable
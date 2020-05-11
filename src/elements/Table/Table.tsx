import React from 'react';
import './Table.scss';
import { 
    ChevronRight as ChevronRightIcon,
    ChevronLeft as ChevronLeftIcon
} from '@material-ui/icons';
import IconButton from '../IconButton/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';

type Pagination = {
    pages: number;
    currentPage: number;
    totalCount: number;
}

interface Props {
    content: Array<Array<any>>;
    dataFiltrationComponent?: JSX.Element;
    headers: Array<string>;
    margin?: string;
    nextPageClickHandler(): void;
    pagination: Pagination;
    previousPageClickHandler(): void;
    progressIndicatorVisible?: boolean;
    tableRowClickHandler?: {(params: any): void};
}

function Table(props: Props) {
    const bodyRowClickHandler = (e: React.MouseEvent) => {
        const element = e.target as HTMLElement;
        const row = element.closest('tr');
        if (props.tableRowClickHandler && row) props.tableRowClickHandler(row.dataset.rowIndex);
    }
    return (
        <div className={`table--container Table ${props.margin}`}>
            <LinearProgress className="progress--indicator" style={{visibility: props.progressIndicatorVisible ? 'visible' : 'hidden'}} />
            <div className="table--content">
                <div className="table--container">
                    {props.dataFiltrationComponent}
                    <table>
                        <thead>
                            <tr>
                                {props.headers.map((el, index) => <th key={index}>{el}</th>)}
                            </tr>
                        </thead>
                        <tbody onClick={bodyRowClickHandler}>
                            {props.content.map((el, outerIndex) => <tr key={outerIndex} data-row-index={outerIndex} style={{cursor: props.tableRowClickHandler ?  'pointer' : 'initial'}}>
                                {el.map((data, innerIndex) => <td key={innerIndex}>{data}</td>)}
                            </tr>)}
                        </tbody>
                    </table>
                </div>
                {props.pagination ? <div className="table--pagination">
                    <div className="pagination--controls">
                        <IconButton 
                            iconElement={<ChevronRightIcon />} 
                            margin="margin-right-10"
                            clickHandler={props.nextPageClickHandler}
                            disabled={props.pagination.currentPage + 1 > props.pagination.pages}
                            waveColor="#fff"
                        />
                        <IconButton 
                            iconElement={<ChevronLeftIcon />} 
                            margin="margin-right-10" 
                            clickHandler={props.previousPageClickHandler}
                            disabled={props.pagination.currentPage - 1 < 1}
                            waveColor="#fff"
                        />
                        <div className="page--tracker margin-left-right-40">
                            <span>{props.pagination.totalCount}</span>
                            <span>of</span>
                            <span>
                                {
                                    
                                    props.pagination.totalCount >= 1 ? 1 + (25 * (props.pagination.currentPage - 1)) : 0
                                }
                                -
                                {
                                    25 * props.pagination.currentPage > props.pagination.totalCount ? props.pagination.totalCount : 25 * props.pagination.currentPage
                                }
                            </span>
                        </div>
                        <div className="rows--per--page">25</div>
                        <div className="margin-right-15">:Rows per page</div>
                    </div>
                </div> : null}
            </div>
        </div>
    )
}

export default Table;
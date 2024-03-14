import {BiSolidLeftArrow, BiSolidRightArrow} from "react-icons/bi";

export const ProblemsPagination: React.FC<{
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="btn-pages">
            <BiSolidLeftArrow size={14} cursor={'pointer'} onClick={() => handlePageChange(currentPage - 1)} />
            <p className="pages-index">
                {((currentPage - 1) * itemsPerPage) + 1}-
                {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems}
            </p>
            <BiSolidRightArrow size={14} cursor={'pointer'} onClick={() => handlePageChange(currentPage + 1)} />
        </div>
    );
};
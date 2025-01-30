interface PaginationProps {
    currentPage: number;
    onNextPage: () => void;
    onPreviousPage: () => void;
    forecastDays: number;
}
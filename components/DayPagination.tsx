import React, { FC } from 'react';
import { View, Button } from 'react-native';
interface PaginationProps {
    currentPage: number;
    onNextPage: () => void;
    onPreviousPage: () => void;
}
const DayPagination: React.FC<PaginationProps> = ({ currentPage, onNextPage, onPreviousPage }) => {
    return (
        <View className="absolute bottom-20 left-0 right-0 flex-row justify-between px-4">
            {currentPage > 0 && <Button title="<" onPress={onPreviousPage} />}
            {currentPage < 6 && <Button title=">" onPress={onNextPage} />}
        </View>
    );
};

export default DayPagination

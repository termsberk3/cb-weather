import React, { FC } from 'react';
import { View, Button } from 'react-native';
interface PaginationProps {
    currentPage: number;
    onNextPage: () => void;
    onPreviousPage: () => void;
}
const DayPagination: React.FC<PaginationProps> = ({ currentPage, onNextPage, onPreviousPage }) => {
    return (
        <View className="absolute bottom-[50%] left-0 right-0 flex-row justify-between px-4">
            <View className="justify-start "> 
                {currentPage > 0 && <Button color="purple" title="<" onPress={onPreviousPage} />}
            </View>
            <View className="justify-end">
                {currentPage < 6 && <Button color="purple" title=">" onPress={onNextPage} />}
            </View>
        </View>
    );
};

export default DayPagination

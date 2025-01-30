import React, { FC } from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import { PaginationProps } from '../interfaces/Pagination';

const DayPagination: FC<PaginationProps> = ({ currentPage, onNextPage, onPreviousPage, forecastDays }) => {
    const totalPages = forecastDays > 1 ? forecastDays - 1 : 0;
    return (
        <View className="absolute bottom-[50%] left-0 right-0 flex-row justify-between px-4">
            <View className="justify-start">
                {currentPage > 0 && (
                    <Pressable
                        onPress={onPreviousPage}
                        className="transform scale-150"
                    >
                        <Text style={styles.buttonText}>{"<"}
                        </Text>
                    </Pressable>
                )}
            </View>
            <View className="justify-end">
                {currentPage < totalPages && (
                    <Pressable
                        onPress={onNextPage}
                        className="transform scale-150"
                    >
                        <Text style={styles.buttonText}>{">"}
                        </Text>
                    </Pressable>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'purple',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        transform: [{ scaleX: 3 }, { scaleY: 3 }],
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
    },
});
export default DayPagination

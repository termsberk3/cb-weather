import locationReducer from "../redux/reducers/location-slice"
import { fetchLocation } from "../redux/reducers/location-slice";
import * as locationUtils from "../utilities/Geolocation";
interface LocationState {
    city: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: LocationState = {
    city: null,
    loading: false,
    error: null,
};

jest.mock('../utilities/Geolocation', () => ({
    getCurrentLocation: jest.fn(),
}));

describe('location slice', () => {
    it('should return the initial state', () => {
        expect(locationReducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should handle fetchLocation.pending', () => {
        const nextState = locationReducer(initialState, { type: fetchLocation.pending.type });

        expect(nextState.loading).toBe(true);
        expect(nextState.error).toBeNull();
    });

    it('should handle fetchLocation.fulfilled', async () => {
        // Mock the getCurrentLocation function to return specific coordinates
        const mockCoords = { latitude: 40.7128, longitude: -74.0060 };
        (locationUtils.getCurrentLocation as jest.Mock).mockResolvedValue(mockCoords);
    
        // Mock the getCityFromCoordinates function if needed (depends on your implementation)
        const mockCity = 'New York';
        const getCityFromCoordinates = jest.fn().mockResolvedValue(mockCity);
    
        const nextState = await locationReducer(initialState, {
          type: fetchLocation.fulfilled.type,
          payload: mockCity,
        });
    
        expect(nextState.loading).toBe(false);
        expect(nextState.city).toBe(mockCity);
      });

    it('should handle fetchLocation.rejected', () => {
        const mockError = 'Location not found';
        const nextState = locationReducer(initialState, {
            type: fetchLocation.rejected.type,
            error: { message: mockError },
        });

        expect(nextState.loading).toBe(false);
        expect(nextState.error).toBe(mockError);
    });
});
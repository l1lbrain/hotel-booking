export default function LoadingSpinner({ fullScreen = true }) {
    if (fullScreen) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-blue-500"></div>
            </div>
        );
    }

    // Trường hợp dùng inline trong một ô nhỏ, không chiếm full screen
    return (
        <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-4 border-gray-300 border-t-blue-500"></div>
        </div>
    );
}

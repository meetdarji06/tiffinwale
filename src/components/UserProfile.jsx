export default function UserProfile() {
    return (
        <div className="items-center space-x-3 p-2 hidden md:flex">
            {/* Profile Image */}
            {/* <div className="w-10 h-10 p-[2px] border-2 border-[var(--primary-color)] dark:border-gray-100 rounded-full overflow-hidden">
                <img
                    src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" // Replace with actual image URL
                    alt="User Avatar"
                    className="w-full h-full object-cover rounded-full"
                />
            </div> */}

            {/* User Info */}
            <div>
                <p className="text-[var(--text-color)] font-medium dark:text-white">Meet Darji</p>
                <p className="text-gray-500 text-[12px]">USER</p>
            </div>
        </div>
    );
}

import React from "react";

interface ProfileProps {
    user: {
        username: string;
        ivaoId: string;
        role: string;
        joined: string;
    };
}

const ProfileCard: React.FC<{ user: ProfileProps["user"] }> = ({ user }) => {
    if (!user) return null;

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">User Profile</h2>
            <div className="mt-4">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>IVAO ID:</strong> {user.ivaoId}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Joined:</strong> {user.joined}</p>
            </div>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
                Edit Profile
            </button>
        </div>
    );
};

export default ProfileCard;

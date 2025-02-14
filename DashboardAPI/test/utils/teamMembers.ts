import mongoose from 'mongoose';
import ObjectID from 'Common/Types/ObjectID';
import ProjectModel from '../../backend/models/project';

export default {
    /**
     * Adds team members to a project
     * @param { {userId, role}[]} teamMembers
     * @param {Object} projectId
     * @returns {Object | {error : string}} the updated project or an error
     */
    addTeamMembersToProject: async function (
        projectId: ObjectID,
        teamMembers: $TSFixMe
    ): void {
        try {
            if (
                Array.isArray(teamMembers) &&
                teamMembers.length &&
                mongoose.isValidObjectId(projectId)
            ) {
                const updatedProject: $TSFixMe =
                    await ProjectModel.findOneAndUpdate(
                        {
                            _id: projectId,
                        },
                        {
                            $addToSet: {
                                users: {
                                    $each: teamMembers,
                                },
                            },
                        },
                        {
                            new: true,
                        }
                    );
                return updatedProject;
            }
        } catch (error) {
            return { error: 'Can not add team members to project' };
        }
    },

    /**
     * Removes team members to a project
     * @param { {userId, role}[]} teamMembers
     * @param {Object} projectId
     * @returns {Object | {error : string}} the updated project or an error
     */
    removeTeamMembersFromProject: async function (
        projectId: ObjectID,
        teamMembers: $TSFixMe
    ): void {
        try {
            if (
                Array.isArray(teamMembers) &&
                teamMembers.length &&
                mongoose.isValidObjectId(projectId)
            ) {
                const updatedProject: $TSFixMe =
                    await ProjectModel.findOneAndUpdate(
                        {
                            _id: projectId,
                        },
                        {
                            $pullAll: {
                                users: teamMembers,
                            },
                        },
                        {
                            new: true,
                        }
                    );
                return updatedProject;
            }
        } catch (error) {
            return { error: 'Can not remove team members to project' };
        }
    },
};

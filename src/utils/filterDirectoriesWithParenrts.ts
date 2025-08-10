import { Directory } from "@/types/StrapiSDK";

const filterDirectoriesWithParents = (
    directories: Directory[]
): Directory[] => {
    return directories.filter((directory) => {
        return directory.parent_directory === null;
    });
};

export default filterDirectoriesWithParents;

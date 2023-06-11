const Filter = ({ searchName, handleSearchName }) => {
    return (
        <form>
            filter shown with:
            <input
            value={searchName}
            onChange={handleSearchName}
            />
        </form>
    )
};

export default Filter;
import { useState, useEffect } from 'react';

function useFilterLogic(games) {
    const [filter, setFilter] = useState(["FINISHED", "IN_PROGRESS", "BACKLOG", "ABANDONED"]);
    const [sort, setSort] = useState("az");
    const [filteredGames, setFilteredGames] = useState([]);

    // Select games to display based on current filter and sort based on current sort
    useEffect(() => {
        let result = [];
        for (const game of games) {
            if (filter.includes(game.status)) {
                result.push(game);
            }
        }

        // TODO: implement sort
        
        setFilteredGames(result);
    }, [games, filter, sort])

    return {
        filter,
        setFilter,
        sort,
        setSort,
        filteredGames,
        setFilteredGames
    }
}

export default useFilterLogic;
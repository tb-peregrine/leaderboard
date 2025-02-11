SELECT
    concat('game_', toString(rand() % 100000)) AS game_id,
    now() - toIntervalDay(rand() % 30) - toIntervalSecond(rand() % 86400) AS game_start,
    ['player1', 'player2', 'player3', 'player4', 'player5'][1 + (rand() % 5)] AS winner,
    concat('{"score":', toString(rand() % 1000), ',"duration":', toString(rand() % 3600), '}') AS payload
FROM numbers(500)
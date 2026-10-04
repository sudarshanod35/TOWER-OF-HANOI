/* ==========================================================================
   TOWER OF HANOI – AI PROBLEM SOLVER USING PROLOG
   File: hanoi.pl
   Author: AI Problem Solver Team
   Language: SWI-Prolog
   ==========================================================================
   This program implements the Tower of Hanoi problem-solving engine using
   Prolog's declarative logic programming paradigm.
   
   It models:
     1. State representation: state(TowerA, TowerB, TowerC)
     2. Initial state: state([1,2,...,N], [], [])
     3. Goal state: state([], [], [1,2,...,N])
     4. Legal moves & State transitions: valid_move/3
     5. Recursive problem-solving predicate: solve_hanoi/2
     6. JSON-serialized solver predicate for Node.js backend integration:
        solve_and_print_json/1
   ========================================================================== */

:- module(hanoi, [
    solve_hanoi/2,
    hanoi/5,
    initial_state/2,
    goal_state/2,
    valid_move/3,
    optimal_moves/2,
    solve_and_print_json/1,
    test_hanoi/0
]).

/* --------------------------------------------------------------------------
   1. PROBLEM DECOMPOSITION & RECURSIVE LOGIC
   --------------------------------------------------------------------------
   To move N disks from tower 'From' to tower 'To' using 'Aux' as spare:
     Base case:
       Moving 0 disks requires 0 moves ([]).
       Moving 1 disk: simply move disk 1 from From to To.
     Recursive step:
       1. Move top (N-1) disks from 'From' to 'Aux' using 'To'.
       2. Move disk N from 'From' to 'To'.
       3. Move (N-1) disks from 'Aux' to 'To' using 'From'.
   -------------------------------------------------------------------------- */

%% solve_hanoi(+N, -Moves)
%  Public query predicate to solve Tower of Hanoi for N disks.
%  Towers are labeled:
%    a = Source Tower
%    b = Auxiliary Tower
%    c = Destination / Goal Tower
solve_hanoi(N, Moves) :-
    integer(N),
    N >= 1,
    hanoi(N, a, c, b, Moves).

%% Base Case 1: 0 disks -> no moves needed
hanoi(0, _, _, _, []) :- !.

%% Base Case 2: 1 disk -> single move from source to destination
hanoi(1, From, To, _, [move(From, To, 1)]) :- !.

%% Recursive Case: N disks (where N > 1)
hanoi(N, From, To, Aux, Moves) :-
    N > 1,
    N1 is N - 1,
    % Step 1: Move top N-1 disks from From to Aux
    hanoi(N1, From, Aux, To, Moves1),
    % Step 2: The single move of disk N from From to To
    MoveN = move(From, To, N),
    % Step 3: Move N-1 disks from Aux to To
    hanoi(N1, Aux, To, From, Moves2),
    % Concatenate the three sub-sequences
    append(Moves1, [MoveN | Moves2], Moves).


/* --------------------------------------------------------------------------
   2. MATHEMATICAL COMPLEXITY
   --------------------------------------------------------------------------
   The optimal number of moves is 2^N - 1.
   Time complexity:  O(2^N)
   Space complexity: O(N) recursive call stack
   -------------------------------------------------------------------------- */

%% optimal_moves(+N, -Count)
optimal_moves(N, Count) :-
    Count is (2 ** N) - 1.


/* --------------------------------------------------------------------------
   3. FORMAL STATE REPRESENTATION & TRANSITIONS
   --------------------------------------------------------------------------
   State: state(TowerA, TowerB, TowerC)
   Each tower is represented as an ordered list of disks.
   The head of the list represents the topmost disk.
   Example: [1, 2, 3] means disk 1 is at the top, disk 3 is at the base.
   A move is only valid if smaller disks are placed on larger disks:
   Head of source tower < Head of destination tower (or destination is empty).
   -------------------------------------------------------------------------- */

%% generate_disks(+N, -List)
%  Generates [1, 2, ..., N]
generate_disks(0, []) :- !.
generate_disks(N, Disks) :-
    findall(D, between(1, N, D), Disks).

%% initial_state(+N, -State)
initial_state(N, state(A, [], [])) :-
    generate_disks(N, A).

%% goal_state(+N, -State)
goal_state(N, state([], [], C)) :-
    generate_disks(N, C).

%% valid_move(+CurrentState, -Move, -NextState)
%  Models the production rules / operators for state space transitions.
%  Rule 1: Move from A to B
valid_move(state([Disk|RestA], B, C), move(a, b, Disk), state(RestA, [Disk|B], C)) :-
    can_place(Disk, B).

%  Rule 2: Move from A to C
valid_move(state([Disk|RestA], B, C), move(a, c, Disk), state(RestA, B, [Disk|C])) :-
    can_place(Disk, C).

%  Rule 3: Move from B to A
valid_move(state(A, [Disk|RestB], C), move(b, a, Disk), state([Disk|A], RestB, C)) :-
    can_place(Disk, A).

%  Rule 4: Move from B to C
valid_move(state(A, [Disk|RestB], C), move(b, c, Disk), state(A, RestB, [Disk|C])) :-
    can_place(Disk, C).

%  Rule 5: Move from C to A
valid_move(state(A, B, [Disk|RestC]), move(c, a, Disk), state([Disk|A], B, RestC)) :-
    can_place(Disk, A).

%  Rule 6: Move from C to B
valid_move(state(A, B, [Disk|RestC]), move(c, b, Disk), state(A, [Disk|B], RestC)) :-
    can_place(Disk, B).

%% can_place(+Disk, +TowerList)
%  A disk can be placed on an empty tower or on a larger disk (Head > Disk).
can_place(_, []).
can_place(Disk, [Top|_]) :-
    Disk < Top.


/* --------------------------------------------------------------------------
   4. JSON BRIDGE FOR NODE.JS / EXPRESS INTEGRATION
   --------------------------------------------------------------------------
   This predicate outputs valid JSON directly to standard output.
   Node.js calls:
     swipl -q -s hanoi.pl -g "solve_and_print_json(3), halt."
   Output:
     {"disks":3,"optimalMoves":7,"moves":[{"from":"A","to":"C","disk":1},...]}
   -------------------------------------------------------------------------- */

%% solve_and_print_json(+N)
solve_and_print_json(N) :-
    solve_hanoi(N, Moves),
    optimal_moves(N, Opt),
    format('{"disks":~d,"optimalMoves":~d,"moves":[', [N, Opt]),
    print_moves_json(Moves),
    format(']}~n', []).

print_moves_json([]).
print_moves_json([move(From, To, Disk)]) :-
    !,
    tower_uppercase(From, FromUpper),
    tower_uppercase(To, ToUpper),
    format('{"from":"~w","to":"~w","disk":~d}', [FromUpper, ToUpper, Disk]).
print_moves_json([move(From, To, Disk) | Rest]) :-
    tower_uppercase(From, FromUpper),
    tower_uppercase(To, ToUpper),
    format('{"from":"~w","to":"~w","disk":~d},', [FromUpper, ToUpper, Disk]),
    print_moves_json(Rest).

tower_uppercase(a, 'A').
tower_uppercase(b, 'B').
tower_uppercase(c, 'C').


/* --------------------------------------------------------------------------
   5. VERIFICATION & UNIT TESTING
   --------------------------------------------------------------------------
   Run in SWI-Prolog:
     ?- test_hanoi.
   Verifies:
     N=3 -> 7 moves
     N=4 -> 15 moves
     N=5 -> 31 moves
   -------------------------------------------------------------------------- */

test_hanoi :-
    format('~n=== Testing Tower of Hanoi Prolog Engine ===~n', []),
    test_case(3, 7),
    test_case(4, 15),
    test_case(5, 31),
    format('=== All Tests Passed Successfully! ===~n~n', []).

test_case(N, Expected) :-
    solve_hanoi(N, Moves),
    length(Moves, Actual),
    (   Actual =:= Expected
    ->  format('[PASS] N=~d disks -> ~d moves (matches 2^~d - 1)~n', [N, Actual, N])
    ;   format('[FAIL] N=~d disks -> expected ~d moves, got ~d~n', [N, Expected, Actual]),
        fail
    ).

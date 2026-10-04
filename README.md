# TOWER OF HANOI – AI PROBLEM SOLVER USING PROLOG

> **College Artificial Intelligence Project**  
> **Architecture:** React Frontend ➔ Node.js + Express Backend ➔ SWI-Prolog Reasoning Engine

---

## 1. Project Title
**Tower of Hanoi – AI Problem Solver using SWI-Prolog**

---

## 2. Introduction
The Tower of Hanoi is one of the foundational benchmark problems in Artificial Intelligence and Theoretical Computer Science. This project implements a modern full-stack application where the actual mathematical problem solving and inference is conducted entirely by a genuine **SWI-Prolog** program. The solution is transmitted to an Express backend and animated on an interactive React user interface.

---

## 3. Problem Statement
Given three vertical pegs labeled **Tower A (Source)**, **Tower B (Auxiliary)**, and **Tower C (Destination)**, and a stack of $N$ disks of differing diameters on Tower A in decreasing order of size, the objective is to transfer the entire stack from Tower A to Tower C subject to the following invariant rules:
1. Only one disk can be moved at a time.
2. Only the topmost disk from any peg may be removed.
3. No disk may ever be placed on top of a disk smaller than itself.

---

## 4. Project Objective
- Provide an interactive, responsive dual-mode simulator:
  1. **Human Mode:** Allows the student/player to attempt the puzzle manually with real-time rule validation.
  2. **Prolog AI Mode:** Invokes SWI-Prolog to compute the mathematically optimal move sequence and play it back sequentially.
- Demonstrate key Artificial Intelligence concepts (state space formulation, transition operators, declarative deduction, and complexity limits) suitable for a college viva and practical demonstration.

---

## 5. Why Prolog is Used
Traditional imperative languages (JavaScript, C++, Java, Python) require the programmer to prescribe *how* to calculate step-by-step using control loops, manual memory tracking, and mutation.

In contrast, **Prolog (Programming in Logic)** is a declarative logic programming language based on first-order predicate calculus and Horn clauses. In Prolog:
- We formulate the problem definition, relations, and recursive constraints declaratively.
- The built-in **SLD resolution** (Selective Linear Definite clause resolution) inference engine, unification, and depth-first search automatically deduce the optimal move sequence.
- This represents symbolic Artificial Intelligence in its purest academic form.

---

## 6. Artificial Intelligence Concepts Demonstrated
1. **State Space Representation:** Formal mathematical representation of environmental states.
2. **Initial State & Goal State:** Clear definitions of the start and target conditions.
3. **Transition Operators / Actions:** Legal operators that transition the system from $S_t$ to $S_{t+1}$.
4. **Goal Test:** Predicate verifying whether the current state meets the termination criteria.
5. **Problem Decomposition (Divide and Conquer):** Breaking an $N$-disk problem into two $(N-1)$ subproblems.
6. **Symbolic Reasoning & Unification:** Pattern matching Prolog terms and binding variables during logical proof search.

---

## 7. State Representation
In our Prolog engine (`backend/prolog/hanoi.pl`), the world state is represented as a compound term:
```prolog
state(TowerA, TowerB, TowerC)
```
Each tower is represented as an ordered list of integer disk sizes, with the head of the list representing the topmost disk:
```prolog
% Disk 1 is smallest, Disk 3 is largest
state([1, 2, 3], [], [])
```

---

## 8. Initial State
All $N$ disks are stacked in increasing order on Tower A:
```prolog
initial_state(N, state(A, [], [])) :-
    findall(D, between(1, N, D), A).
```
For $N = 3$:
```prolog
state([1, 2, 3], [], [])
```

---

## 9. Goal State
All $N$ disks reside on Tower C in identical order:
```prolog
goal_state(N, state([], [], C)) :-
    findall(D, between(1, N, D), C).
```
For $N = 3$:
```prolog
state([], [], [1, 2, 3])
```

---

## 10. Actions / Transition Operators
An action `move(From, To, Disk)` moves the top disk from one tower to another, provided:
$$\text{Disk} < \text{Top}(\text{Destination}) \quad \lor \quad \text{Destination is empty}$$

In Prolog:
```prolog
valid_move(state([Disk|RestA], B, C), move(a, b, Disk), state(RestA, [Disk|B], C)) :-
    can_place(Disk, B).

can_place(_, []).
can_place(Disk, [Top|_]) :-
    Disk < Top.
```

---

## 11. Prolog Predicates
The primary predicates implemented in `backend/prolog/hanoi.pl`:

1. `solve_hanoi(+N, -Moves)`: Entry point for solving $N$ disks; returns the list of `move(From, To, Disk)`.
2. `hanoi(+N, +From, +To, +Aux, -Moves)`: Recursive divide-and-conquer solver.
3. `optimal_moves(+N, -Count)`: Computes $2^N - 1$.
4. `solve_and_print_json(+N)`: Formats the Prolog solution into standard JSON for the backend bridge.
5. `test_hanoi`: Built-in automated unit tests verifying move counts for $N \in \{3, 4, 5\}$.

---

## 12. Algorithm (Recursive Problem Decomposition)
To move $N$ disks from `From` to `To` using `Aux`:
```prolog
hanoi(0, _, _, _, []) :- !.
hanoi(1, From, To, _, [move(From, To, 1)]) :- !.
hanoi(N, From, To, Aux, Moves) :-
    N > 1,
    N1 is N - 1,
    hanoi(N1, From, Aux, To, Moves1),
    MoveN = move(From, To, N),
    hanoi(N1, Aux, To, From, Moves2),
    append(Moves1, [MoveN | Moves2], Moves).
```
1. Recursively transfer $(N-1)$ disks from `From` to `Aux` peg.
2. Transfer the single remaining largest disk $N$ directly from `From` to `To` peg.
3. Recursively transfer the $(N-1)$ disks from `Aux` to `To` peg.

---

## 13. System Architecture
```
┌──────────────────────────────────────────────┐
│            React Frontend (Vite)             │
│  - Towers UI & Responsive Disk Animations    │
│  - Human Mode with Rule Validation           │
│  - Prolog Engine Query & AI State Panels     │
└──────────────────────┬───────────────────────┘
                       │ HTTP POST /api/solve { disks: 3 }
                       ▼
┌──────────────────────────────────────────────┐
│        Node.js + Express Backend             │
│  - Checks system PATH for 'swipl'            │
│  - Spawns SWI-Prolog child_process           │
│  - Receives JSON stdout from Prolog          │
└──────────────────────┬───────────────────────┘
                       │ swipl -q -s hanoi.pl -g "solve_and_print_json(3), halt."
                       ▼
┌──────────────────────────────────────────────┐
│           SWI-Prolog Engine (swipl)          │
│  - File: backend/prolog/hanoi.pl             │
│  - Executes solve_hanoi/2 predicate          │
│  - Returns exact sequence of 7 moves (JSON)  │
└──────────────────────────────────────────────┘
```

---

## 14. React ➔ Node ➔ Prolog Communication
1. **Frontend Trigger:** User selects disk count (e.g., 3) and clicks **"ASK PROLOG AI"**.
2. **HTTP Request:** React sends `POST /api/solve` with body `{"disks": 3}` to Express.
3. **Process Spawning:** Express invokes:
   ```bash
   swipl -q -s "prolog/hanoi.pl" -g "solve_and_print_json(3), halt."
   ```
4. **Prolog Reasoning:** SWI-Prolog resolves the Horn clauses and prints the JSON array to standard output.
5. **HTTP Response:** Express parses stdout and responds to React:
   ```json
   {
     "success": true,
     "disks": 3,
     "optimalMoves": 7,
     "moves": [
       {"from":"A","to":"C","disk":1},
       {"from":"A","to":"B","disk":2},
       {"from":"C","to":"B","disk":1},
       {"from":"A","to":"C","disk":3},
       {"from":"B","to":"A","disk":1},
       {"from":"B","to":"C","disk":2},
       {"from":"A","to":"C","disk":1}
     ],
     "engine": "SWI-Prolog"
   }
   ```
6. **Animation:** React iterates through the moves, displaying disk transitions with customizable playback speed.

---

## 15. Complexity Analysis

| Metric | Complexity | Explanation |
|---|---|---|
| **Optimal Move Count** | $2^N - 1$ | $N=3 \to 7$, $N=4 \to 15$, $N=5 \to 31$, $N=10 \to 1023$ |
| **Time Complexity** | $\mathcal{O}(2^N)$ | Recurrence relation: $T(N) = 2T(N-1) + 1$. Each disk doubles operations. |
| **Space Complexity** | $\mathcal{O}(N)$ | The maximum call stack depth of the Prolog recursion equals $N$. |

---

## 16. Installation Prerequisites

1. **SWI-Prolog** (64-bit for Windows)
2. **Node.js** (v18 or higher with npm)

---

## 17. SWI-Prolog Setup on Windows

### Quick 1-Minute Setup (Using Downloaded Installer)
The official SWI-Prolog installer has already been downloaded to your machine at:
```text
C:\Users\sunil_4iewzg6\AppData\Local\Temp\WinGet\SWI-Prolog.SWI-Prolog.10.0.2\swipl-10.0.2-1.x64.exe
```
1. Press `Win + R`, paste the path above, and press **Enter**.
2. Click **Yes** on the Windows UAC permission dialog.
3. During setup, make sure to check the option:  
   ☑ **"Add swipl to the system PATH for current user (or all users)"**
4. Click **Install** and finish.
5. Verify in a new terminal:
   ```powershell
   swipl --version
   ```
   Output: `SWI-Prolog version 10.0.2 for x64-win64`

*(Alternatively, download directly from the official website: [https://www.swi-prolog.org/download/stable](https://www.swi-prolog.org/download/stable))*

---

## 18. How to Run the Project

### Step 1: Install Backend Dependencies & Start Server
```powershell
cd tower-of-hanoi\backend
npm install
npm start
```
*Backend runs on `http://localhost:5000`*

### Step 2: Install Frontend Dependencies & Start React
Open a second terminal window:
```powershell
cd tower-of-hanoi\frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`*

Open your browser and navigate to: `http://localhost:5173`

---

## 19. How to Demonstrate in SWI-Prolog Standalone
To prove to your professor that the Prolog code works completely independently:
```powershell
cd tower-of-hanoi\backend\prolog
swipl hanoi.pl
```
Inside the SWI-Prolog interactive shell:
```prolog
?- solve_hanoi(3, Moves).
% Returns 7 moves

?- solve_hanoi(4, Moves).
% Returns 15 moves

?- solve_hanoi(5, Moves).
% Returns 31 moves

?- test_hanoi.
% Runs automated self-test suite!
```

---

## 20. Future Improvements
- Heuristic A* Search visualization comparing blind vs informed search in Prolog.
- Frame-Peg (4-peg / Reve's puzzle) implementation.
- Export move transcripts to CSV or PDF for academic grading.

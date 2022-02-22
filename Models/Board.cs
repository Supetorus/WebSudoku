using System;
using System.Linq;
using System.Text;

namespace WebSudoku.Models
{
	public class Board
	{
		public static readonly int SIZE = 9;

		public int ID { get; private set; }
		public float Timer { get; private set; }
		public int Mistakes { get; private set; }
		public int Hints { get; private set; }
		public string UnsolvedData { get; private set; }
		public string CurrentData { get; private set; }
		public string NotesData { get; private set; }
		public int Difficulty { get; private set; }

		private int[][] solved = new int[SIZE][]; // Full board with all numbers
		private int[][] unsolved = new int[SIZE][]; // The starting board with empty spaces
		private int[][] current = new int[SIZE][]; // The starting board plus numbers user has entered
		private int[][][][] notes = new int[SIZE][][][];

		private int[] nums = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };

		private int[] indices = {
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
			10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
			20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
			30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
			40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
			50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
			60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
			70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80 };

		private Random r = new Random();

		public Board()
		{
			for (int i = 0; i < SIZE; ++i)
			{
				solved[i] = new int[SIZE];
				unsolved[i] = new int[SIZE];
				current[i] = new int[SIZE];
				notes[i] = new int[SIZE][][];

				for (int j = 0; j < 3; ++j)
				{
					notes[i][j] = new int[3][];
					for(int k = 0; k < 3; ++k)
					{
						notes[i][j][k] = new int[3];
					}
				}
			}
		}

		public void Load()
		{
			for(int i = 0; i < SIZE; ++i)
			{
				for (int j = 0; j < SIZE; ++j)
				{
					unsolved[i][j] = UnsolvedData[i + j * SIZE];
					current[i][j] = CurrentData[i + j * SIZE];

					for (int k = 0; k < 3; ++k)
					{
						for (int l = 0; l < 3; ++l)
						{
							notes[i][j][k][l] = NotesData[i + j * SIZE + k * SIZE * SIZE + l * SIZE * SIZE * 3];
						}
					}
				}
			}
		}

		public void Save()
		{
			StringBuilder sbs = new StringBuilder();
			StringBuilder sbu = new StringBuilder();
			StringBuilder sbn = new StringBuilder();

			for(int i = 0; i < SIZE; ++i) 
			{
				for(int j = 0; j < SIZE; ++j)
				{
					sbs.Append(solved[i][j].ToString());
					sbu.Append(unsolved[i][j].ToString());

					for (int k = 0; k < 3; ++k)
					{
						for (int l = 0; l < 3; ++l)
						{
							sbn.Append(unsolved[k][l].ToString());
						}
					}
				}
			}

			UnsolvedData = sbs.ToString();
			CurrentData = sbu.ToString();
			NotesData = sbn.ToString();
		}

		/// <summary>
		/// Generates a fresh board.
		/// </summary>
		/// 
		public void Generate(int difficulty)
		{
			Difficulty = difficulty;

			while (!FillGrid())
			{
				ClearGrid(solved);
			}

			do
			{
				CopyGrid(solved, unsolved);
				RemoveNums();
			} while (!SolveGrid() && !CompareGrids(solved, current));

			CopyGrid(unsolved, current);
		}

		public int[][] GetGrid()
		{
			return current;
		}

		/// <summary>
		/// Returns the number in the current board in the given location.
		/// </summary>
		/// <param name="x">Column, 0 based</param>
		/// <param name="y">Row, 0 based</param>
		/// <returns></returns>
		public int GetNum(int x, int y) { return current[x][y]; }
		public int GetCorrectNum(int x, int y) { return solved[x][y]; }

		/// <summary>
		/// Returns the number in the given position of the initial, or unsolved board.
		/// </summary>
		/// <param name="x">Column, 0 based</param>
		/// <param name="y">Row, 0 based</param>
		/// <returns></returns>
		public int GetUnsolvedNum(int x, int y) { return unsolved[x][y]; }

		void ClearGrid(int[][] grid)
		{
			for (int x = 0; x < SIZE; ++x)
			{
				for (int y = 0; y < SIZE; ++y)
				{
					grid[x][y] = 0;
				}
			}
		}

		// Returns true if the given grids are identical.
		bool CompareGrids(int[][] g1, int[][] g2)
		{
			for (int x = 0; x < SIZE; ++x)
			{
				for (int y = 0; y < SIZE; ++y)
				{
					if (g1[x][y] != g2[x][y])
					{
						return false;
					}
				}
			}

			return true;
		}

		void CopyGrid(int[][] g1, int[][] g2)
		{
			for (int x = 0; x < SIZE; ++x)
			{
				for (int y = 0; y < SIZE; ++y)
				{
					g2[x][y] = g1[x][y];
				}
			}
		}

		bool FillGrid()
		{
			for (int x = 0; x < 9; ++x)
			{
				for (int y = 0; y < 9; ++y)
				{
					bool flag = false;
					nums = nums.OrderBy(x => r.Next()).ToArray();

					foreach (int i in nums)
					{
						if (CheckSafety(x, y, i, solved))
						{
							solved[x][y] = i;
							flag = true;
							break;
						}
					}

					if (!flag)
					{
						return false;
					}
				}
			}

			return true;
		}

		void RemoveNums()
		{
			indices = indices.OrderBy(x => r.Next()).ToArray();

			for (int i = 0; i < Difficulty * 21; ++i)
			{
				unsolved[indices[i] / 9][indices[i] % 9] = 0;
			}
		}

		bool SolveGrid()
		{
			CopyGrid(unsolved, current);

			for (int x = 0; x < SIZE; ++x)
			{
				for (int y = 0; y < SIZE; ++y)
				{
					if (unsolved[x][y] == 0)
					{
						bool flag = false;

						for (int i = 1; i < 10; ++i)
						{
							if (CheckSafety(x, y, i, current))
							{
								current[x][y] = i;
								flag = true;
							}
						}

						if (!flag)
						{
							return false;
						}
					}
				}
			}

			return true;
		}

		public bool CheckSafety(int x, int y, int i)
		{
			return CheckSafety(x, y, i, current);
		}

		/// <summary>
		/// Checks whether i is viable for the position. Used for generating the board.
		/// </summary>
		/// <param name="x">Column, 0 based</param>
		/// <param name="y">Row, 0 based</param>
		/// <param name="i">The number to be checked</param>
		/// <param name="grid">The grid to check in</param>
		/// <returns></returns>
		private bool CheckSafety(int x, int y, int i, int[][] grid)
		{
			//Check Row
			for (int gx = 0; gx < SIZE; ++gx)
			{
				if (grid[gx][y] == i)
				{
					return false;
				}
			}

			//Check Column
			for (int gy = 0; gy < SIZE; ++gy)
			{
				if (grid[x][gy] == i)
				{
					return false;
				}
			}

			//Check Box
			for (int bx = x - (x % 3); bx < x - (x % 3) + 3; ++bx)
			{
				for (int by = y - (y % 3); by < y - (y % 3) + 3; ++by)
				{
					if (grid[bx][by] == i)
					{
						return false;
					}
				}
			}

			return true;
		}

		public bool CheckNum(int x, int y, int i)
		{
			return i == solved[x][y];
		}

		public bool SetNum(int x, int y, int i)
		{
			current[x][y] = i;
			if(i != solved[x][y])
			{
				++Mistakes;
				return false;
			}

			return true;
		}

		public void ResetBoard()
		{
			for (int i = 0; i < 9; i++)
			{
				for (int j = 0; j < 9; j++)
				{
					current[i][j] = unsolved[i][j];
				}
			}
		}

		public bool IsGameWon()
		{
			return CompareGrids(current, solved);
		}

		// Checks if the given number has been used up.
		// ie if the board has all nine of the given number placed.
		public bool IsNumFull(int n)
		{
			int count = 0;

			for (int i = 0; i < 9; i++)
			{
				for (int j = 0; j < 9; j++)
				{
					if (current[i][j] == n && CheckNum(i, j, n)) { count++; }
				}
			}

			return count == 9;
		}
	}
}

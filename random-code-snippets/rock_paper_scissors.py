import random

def game_logic():

    # gameplay should be coninuous,
    # after each round, the user should be displayed with the running score,
    # specifically diplaying rounds won, lost, and tied.
    # use emojis and make for a good terminal ui experience maybe add numbers to select rock, paper, scisors

    # repeatedly request input form the user (either rock, paper, or scissors),
    # randomly generate an answer for the opponent (either rock, paper, or scissors),
    # rock beats scissors, scissors beats paper, paper beats rock.
    # check who won and display the outcome to the user.

    choices = ("rock", "paper", "scissors")
    beats = {"rock": "scissors", "scissors": "paper", "paper": "rock"}
    numbers = {"1": "rock", "2": "paper", "3": "scissors"}
    emojis = {"rock": "🪨", "paper": "📄", "scissors": "✂️"}
    won = lost = tied = 0

    print("\n🎮 Rock, Paper, Scissors")
    print("1. 🪨 Rock | 2. 📄 Paper | 3. ✂️ Scissors")
    print("Enter a number or name. Enter q to quit.\n")

    while True:
        try:
            player = input("Your choice ➜ ").strip().lower()
        except (EOFError, KeyboardInterrupt):
            print()
            break

        if player in ("quit", "exit", "q"):
            break

        player = numbers.get(player, player)
        if player not in choices:
            print("⚠️ Enter 1, 2, 3, rock, paper, scissors, or q.\n")
            continue

        opponent = random.choice(choices)
        print(
            f"\nYou: {emojis[player]} {player.title()}  |  "
            f"Opponent: {emojis[opponent]} {opponent.title()}"
        )

        if player == opponent:
            tied += 1
            print("🤝 It's a tie!")
        elif beats[player] == opponent:
            won += 1
            print("🏆 You win!")
        else:
            lost += 1
            print("😔 You lose!")

        print(f"📊 Won: {won} | Lost: {lost} | Tied: {tied}")
        print("─" * 40)

    return (
        f"\n👋 Thanks for playing!\n"
        f"📊 Final score — Won: {won} | Lost: {lost} | Tied: {tied}"
    )


if __name__ == "__main__":
    print(game_logic())
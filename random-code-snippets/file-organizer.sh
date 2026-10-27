# find all the unique file types in the "files" directory.
# fol each file type found, give the user the option where files with this file type should be moved to.
# the user should be able to choose from a list of existing sub directories (if any) in the "files" directory.
# they should also have the option to create a new directory for that file type.
# once all file types have been assigned a destination directory, organize and move all files into their appropriate directorie

# Run with: bash random-code-snippets/file-organizer.sh
# Uses the "files" directory in the current working directory (not recursively).
set -euo pipefail
shopt -s nullglob dotglob

root="./files"
if [[ ! -d "$root" ]]; then
    printf 'Error: directory "%s" does not exist.\n' "$root" >&2
    exit 1
fi

files=()
types=()
destinations=()

file_type() {
    local name="${1##*/}"
    if [[ "$name" == *.* && "$name" != .* && "$name" != *. ]]; then
        printf '%s' "${name##*.}"
    elif [[ "$name" == .*.* && "$name" != *. ]]; then
        printf '%s' "${name##*.}"
    else
        printf ''
    fi
}

for path in "$root"/*; do
    [[ -f "$path" && ! -L "$path" ]] || continue
    files+=("$path")
    type="$(file_type "$path")"
    found=false
    for existing in "${types[@]+"${types[@]}"}"; do
        if [[ "$existing" == "$type" ]]; then
            found=true
            break
        fi
    done
    if [[ "$found" == false ]]; then
        types+=("$type")
    fi
done

if [[ ${#files[@]} -eq 0 ]]; then
    printf 'No regular files to organize in "%s".\n' "$root"
    exit 0
fi

for type in "${types[@]}"; do
    directories=()
    printf '\nChoose a destination for %s files:\n' "${type:-[no extension]}"
    for path in "$root"/*; do
        [[ -d "$path" && ! -L "$path" ]] || continue
        directories+=("$path")
        printf '  %d) %s\n' "${#directories[@]}" "${path##*/}"
    done
    printf '  n) Create a new directory\n'

    while true; do
        printf 'Choice (or q to quit without moving files): '
        if ! IFS= read -r choice; then
            printf '\nInput ended; no files were moved.\n' >&2
            exit 1
        fi
        case "$choice" in
            q|Q)
                printf 'Cancelled; no files were moved.\n'
                exit 0
                ;;
            n|N)
                printf 'New directory name (one level only): '
                if ! IFS= read -r name; then
                    printf '\nInput ended; no files were moved.\n' >&2
                    exit 1
                fi
                if [[ -z "$name" || "$name" == "." || "$name" == ".." || "$name" == */* ]]; then
                    printf 'Enter a nonempty directory name without slashes.\n' >&2
                    continue
                fi
                destination="$root/$name"
                if [[ -e "$destination" || -L "$destination" ]]; then
                    printf 'That name already exists; choose an existing directory or a new name.\n' >&2
                    continue
                fi
                mkdir -- "$destination"
                destinations+=("$destination")
                break
                ;;
            *)
                valid=false
                for ((i = 0; i < ${#directories[@]}; i++)); do
                    if [[ "$choice" == "$((i + 1))" ]]; then
                        destinations+=("${directories[i]}")
                        valid=true
                        break
                    fi
                done
                if [[ "$valid" == true ]]; then
                    break
                fi
                printf 'Choose a listed number, n, or q.\n' >&2
                ;;
        esac
    done
done

status=0
for path in "${files[@]}"; do
    type="$(file_type "$path")"
    for ((i = 0; i < ${#types[@]}; i++)); do
        [[ "${types[i]}" == "$type" ]] || continue
        target="${destinations[i]}/${path##*/}"
        if [[ -e "$target" || -L "$target" ]]; then
            printf 'Not moved: "%s"; destination "%s" already exists.\n' "$path" "$target" >&2
            status=1
        elif mv -n -- "$path" "$target"; then
            if [[ -e "$path" || -L "$path" ]]; then
                printf 'Not moved: "%s"; destination changed during the move.\n' "$path" >&2
                status=1
            else
                printf 'Moved "%s" -> "%s"\n' "$path" "$target"
            fi
        else
            printf 'Failed to move "%s" to "%s".\n' "$path" "$target" >&2
            status=1
        fi
        break
    done
done

exit "$status"
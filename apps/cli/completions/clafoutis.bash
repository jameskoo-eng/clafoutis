# Bash completion for clafoutis CLI
# Add to ~/.bashrc: source /path/to/clafoutis.bash
# Or: eval "$(clafoutis completions bash)"

_clafoutis_completions() {
    local cur prev words cword
    _init_completion || return

    local commands="init generate sync"
    local init_opts="--producer --consumer --repo --tokens --output --generators --workflow --no-workflow --files --force --dry-run --non-interactive --help"
    local generate_opts="--config --tailwind --figma --output --dry-run --help"
    local sync_opts="--force --config --dry-run --help"
    local global_opts="--version --help"

    case "${words[1]}" in
        init)
            COMPREPLY=($(compgen -W "$init_opts" -- "$cur"))
            return
            ;;
        generate)
            COMPREPLY=($(compgen -W "$generate_opts" -- "$cur"))
            return
            ;;
        sync)
            COMPREPLY=($(compgen -W "$sync_opts" -- "$cur"))
            return
            ;;
    esac

    if [[ $cword -eq 1 ]]; then
        COMPREPLY=($(compgen -W "$commands $global_opts" -- "$cur"))
        return
    fi
}

complete -F _clafoutis_completions clafoutis

/**
 * Copybara Type Definitions
 * 
 * This file provides TypeScript type definitions for Copybara API
 * to enable IntelliSense in VSCode for .sky files
 */

// Core module - Migration and transformation operations
declare namespace core {
  /**
   * Create a workflow migration
   * @param name Name of the workflow
   * @param origin Origin configuration
   * @param destination Destination configuration
   * @param transformations List of transformations to apply
   * @param authoring Authoring configuration
   * @param mode Migration mode: SQUASH, ITERATIVE, or CHANGE_REQUEST
   */
  function workflow(args: {
    name: string;
    origin: Origin;
    destination: Destination;
    transformations?: Transformation[];
    authoring: Authoring;
    mode?: "SQUASH" | "ITERATIVE" | "CHANGE_REQUEST";
    reversible_check?: boolean;
    description?: string;
  }): void;

  /**
   * Move files between directories
   * @param before Source path
   * @param after Destination path
   * @param paths Optional glob pattern
   */
  function move(before: string, after: string, paths?: Glob): Transformation;

  /**
   * Copy files between directories
   * @param before Source path
   * @param after Destination path
   * @param paths Optional glob pattern
   * @param overwrite Whether to overwrite existing files
   */
  function copy(
    before: string,
    after: string,
    paths?: Glob,
    overwrite?: boolean
  ): Transformation;

  /**
   * Replace text in files
   * @param before Text to replace
   * @param after Replacement text
   * @param paths Optional glob pattern
   * @param regex_groups Optional regex groups
   */
  function replace(args: {
    before: string;
    after: string;
    paths?: Glob;
    regex_groups?: { [key: string]: string };
  }): Transformation;

  /**
   * Remove files matching a glob pattern
   * @param paths Glob pattern for files to remove
   */
  function remove(paths: Glob): Transformation;

  /**
   * Group transformations together
   * @param transformations List of transformations
   * @param reversal Optional reverse transformations
   */
  function transform(
    transformations: Transformation[],
    reversal?: Transformation[]
  ): Transformation;

  /**
   * Create a feedback migration
   * @param name Name of the feedback
   * @param origin Origin configuration
   * @param destination Destination configuration
   * @param actions List of actions to execute
   */
  function feedback(args: {
    name: string;
    origin: Origin;
    destination: Destination;
    actions: Action[];
  }): void;

  /**
   * Verify that files match a regex pattern
   * @param regex Pattern to match
   * @param paths Glob pattern for files to check
   * @param also_on_reversal Whether to verify on reversal
   */
  function verify_match(args: {
    regex: string;
    paths?: Glob;
    also_on_reversal?: boolean;
  }): Transformation;

  /**
   * Filter and replace using regex groups
   * @param regex Pattern with capture groups
   * @param mapping Mapping of group names to replacements
   * @param paths Optional glob pattern
   */
  function filter_replace(args: {
    regex: string;
    mapping: { [key: string]: string };
    paths?: Glob;
  }): Transformation;
}

// Git module - Version control operations
declare namespace git {
  /**
   * Define a Git origin
   * @param url Repository URL
   * @param ref Branch or reference
   */
  function origin(args: {
    url: string;
    ref?: string;
    submodules?: "NO" | "YES" | "RECURSIVE";
    first_parent?: boolean;
  }): Origin;

  /**
   * Define a Git destination
   * @param url Repository URL
   * @param fetch Branch to fetch
   * @param push Branch to push
   */
  function destination(args: {
    url: string;
    fetch: string;
    push: string;
    integrates?: any[];
    checker?: Checker;
  }): Destination;

  /**
   * Define a GitHub origin
   * @param url Repository URL
   * @param ref Branch or reference
   */
  function github_origin(args: {
    url: string;
    ref?: string;
    submodules?: "NO" | "YES" | "RECURSIVE";
  }): Origin;

  /**
   * Define a GitHub destination
   * @param url Repository URL
   * @param fetch Branch to fetch
   * @param push Branch to push
   */
  function github_destination(args: {
    url: string;
    fetch?: string;
    push: string;
  }): Destination;

  /**
   * Define a GitHub Pull Request origin
   * @param url Repository URL
   * @param branch Base branch
   */
  function github_pr_origin(args: {
    url: string;
    branch?: string;
    state?: "OPEN" | "CLOSED" | "ALL";
  }): Origin;

  /**
   * Define a GitHub Pull Request destination
   * @param url Repository URL
   * @param destination_ref Destination reference
   */
  function github_pr_destination(args: {
    url: string;
    destination_ref: string;
    title?: string;
    body?: string;
  }): Destination;

  /**
   * Create a GitHub API object
   * @param url GitHub URL
   */
  function github_api(args: { url?: string; checker?: Checker }): GitHubApi;

  /**
   * Create a Gerrit API object
   * @param url Gerrit URL
   */
  function gerrit_api(args: { url: string; checker?: Checker }): GerritApi;

  /**
   * Create a Git mirror migration
   * @param name Name of the mirror
   * @param origin Origin repository URL
   * @param destination Destination repository URL
   */
  function mirror(args: {
    name: string;
    origin: string;
    destination: string;
    refspecs?: string[];
  }): void;
}

// Metadata module - Commit message and author operations
declare namespace metadata {
  /**
   * Squash multiple changes into a single commit message
   * @param prefix Prefix to add to the message
   * @param compact Whether to compact messages
   */
  function squash_notes(args: {
    prefix?: string;
    compact?: boolean;
    oldest_first?: boolean;
  }): Transformation;

  /**
   * Map author emails
   * @param mapping Map of old emails to new emails
   * @param reversible Whether mapping is reversible
   */
  function map_author(
    mapping: { [key: string]: string },
    reversible?: boolean
  ): Transformation;

  /**
   * Add a header to commit messages
   * @param text Header text to add
   * @param newLine Whether to add a new line
   */
  function add_header(text: string, newLine?: boolean): Transformation;

  /**
   * Expose a label from commit message
   * @param label Label name to expose
   * @param separator Separator character
   */
  function expose_label(
    label: string,
    separator?: string
  ): Transformation;

  /**
   * Remove a label from commit message
   * @param label Label name to remove
   */
  function remove_label(label: string): Transformation;

  /**
   * Save the author of changes
   * @param label Label to save author under
   */
  function save_author(label?: string): Transformation;

  /**
   * Restore a previously saved author
   * @param label Label where author was saved
   */
  function restore_author(label?: string): Transformation;

  /**
   * Replace the commit message
   * @param text New message text
   */
  function replace_message(text: string): Transformation;
}

// Authoring module - Author mapping configurations
declare namespace authoring {
  /**
   * Pass through origin author to destination
   * @param default Default author for squash mode
   */
  function pass_thru(default: string): Authoring;

  /**
   * Overwrite all commits with a default author
   * @param default Author to use for all commits
   */
  function overwrite(default: string): Authoring;

  /**
   * Allow only specific authors
   * @param default Default author for non-allowed users
   * @param allowlist List of allowed author emails
   */
  function allowed(args: {
    default: string;
    allowlist: string[];
  }): Authoring;
}

// Patch module - Patch file operations
declare namespace patch {
  /**
   * Apply patch files
   * @param patches Glob pattern for patch files
   * @param strip Number of path segments to strip
   */
  function apply(args: {
    patches: Glob;
    strip?: number;
    excluded_patch_paths?: string[];
  }): Transformation;

  /**
   * Apply Quilt patches
   * @param series Path to series file
   */
  function quilt_apply(args: { series: string }): Transformation;
}

// Buildozer module - BUILD file operations
declare namespace buildozer {
  /**
   * Modify BUILD file targets
   * @param target Target specification
   * @param commands Commands to execute
   */
  function modify(args: {
    target: string | string[];
    commands: (string | Command)[];
  }): Transformation;

  /**
   * Create a new BUILD target
   * @param target Target name
   * @param rule_type Rule type (e.g., "java_library")
   * @param commands Commands to populate the target
   */
  function create(args: {
    target: string;
    rule_type: string;
    commands?: (string | Command)[];
    before?: string;
    after?: string;
  }): Transformation;

  /**
   * Delete a BUILD target
   * @param target Target name
   */
  function delete(args: { target: string }): Transformation;

  /**
   * Create a buildozer command
   * @param forward Forward command
   * @param reverse Optional reverse command
   */
  function cmd(forward: string, reverse?: string): Command;
}

// Console module - Logging operations
declare namespace console {
  /**
   * Print an info message
   * @param message Message to print
   */
  function info(message: string): void;

  /**
   * Print a warning message
   * @param message Message to print
   */
  function warn(message: string): void;

  /**
   * Print an error message and stop execution
   * @param message Message to print
   */
  function error(message: string): void;

  /**
   * Print a verbose message
   * @param message Message to print
   */
  function verbose(message: string): void;

  /**
   * Print a progress message
   * @param message Message to print
   */
  function progress(message: string): void;
}

// Type definitions
type Transformation = any;
type Origin = any;
type Destination = any;
type Authoring = any;
type Glob = any;
type Action = any;
type Checker = any;
type Command = any;
type GitHubApi = any;
type GerritApi = any;

/**
 * Create a glob pattern
 * @param patterns List of glob patterns
 * @param exclude Optional patterns to exclude
 */
declare function glob(
  patterns: string[],
  exclude?: string[]
): Glob;

/**
 * Create a new author
 * @param name Author name
 * @param email Author email
 */
declare function new_author(name: string, email: string): Author;

interface Author {
  name: string;
  email: string;
}

/**
 * TransformWork context object available in custom transformations
 */
interface TransformWork {
  /**
   * List all files in the working directory
   */
  list(): string[];

  /**
   * Read file content
   * @param path File path
   */
  read_path(path: string): string;

  /**
   * Write file content
   * @param path File path
   * @param content File content
   */
  write_path(path: string, content: string): void;

  /**
   * Create a new path object
   * @param path Path string
   */
  new_path(path: string): Path;

  /**
   * Return success result
   */
  success(): TransformationStatus;

  /**
   * Return noop result
   * @param message Optional message
   */
  noop(message?: string): TransformationStatus;

  /**
   * Add a label to commit message
   * @param label Label name
   * @param value Label value
   * @param separator Separator character
   */
  add_label(label: string, value: string, separator?: string): void;

  /**
   * Remove a label from commit message
   * @param label Label name
   */
  remove_label(label: string): void;

  /**
   * Set the author for the change
   * @param author Author object
   */
  set_author(author: Author): void;

  /**
   * Set the commit message
   * @param message New message
   */
  set_message(message: string): void;

  /**
   * Run a command
   * @param command Command to run
   */
  run(command: string[]): Output;

  console: typeof console;
}

interface Path {
  exists(): boolean;
  resolve(other: string): Path;
  relativize(other: Path): Path;
}

interface Output {
  stdout: string;
  stderr: string;
}

type TransformationStatus = any;

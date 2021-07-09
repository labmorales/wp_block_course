<?php
/**
 * Plugin Name:       Custom Blocks
 * Description:       Custom Blocks course
 * Author:            André Morales
 * Text Domain:       custom-blocks
 */

 function custom_blocks_register() {

    wp_register_script('custom-blocks-editor-script', 
        plugins_url('dist/editor.js', __FILE__),
        array('wp-blocks', 'wp-i18n', 'wp-element'),
    );

    wp_register_script('custom-blocks-script', 
        plugins_url('dist/script.js', __FILE__),
        array(),
    );

    wp_register_style('custom-blocks-editor-style', 
        plugins_url('dist/editor.css', __FILE__),
        array('wp-edit-blocks')
    );

    wp_register_style('custom-blocks-style', 
        plugins_url('dist/style.css', __FILE__),
        array()
    );

    register_block_type('custom-blocks/firstblock', 
        array(
            'editor_script' => 'custom-blocks-editor-script',
            'editor_style' => 'custom-blocks-editor-style',
            'script' => 'custom-blocks-script',
            'style' => 'custom-blocks-style',
        )
    );

 }

 add_action('init', 'custom_blocks_register');
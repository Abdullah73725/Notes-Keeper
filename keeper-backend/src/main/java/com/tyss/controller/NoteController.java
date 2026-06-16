package com.tyss.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tyss.entity.Note;
import com.tyss.service.NoteService;

@RestController
@RequestMapping("/notes")
@CrossOrigin(origins = "http://localhost:5173")
public class NoteController {

	@Autowired
	private NoteService noteService;
	
	@PostMapping("/add")
	public Note addNote(
			@RequestBody Note note,
			@RequestHeader("Authorization") String token) {

		return noteService.addNote(note, token);
	}
	
	@GetMapping("/fetch")
	public List<Note> fetchAllNotes(@RequestHeader("Authorization") String token) {
		return noteService.getAllNotes(token);
	}
	
	@PutMapping("/update/{id}")
	public Note updateNote(
			@PathVariable Long id,
			@RequestBody Note updatedNote,
			@RequestHeader("Authorization") String token) {

		return noteService.updateNote(id, updatedNote, token);
	}
	
	@DeleteMapping("/{id}")
	public void deleteById(@PathVariable Long id, @RequestHeader("Authorization") String token) {
		noteService.deleteNote(id, token);
	}
	
	@PutMapping("/pin/{id}")
	public Note togglePin(@PathVariable Long id, @RequestHeader("Authorization") String token) {
		return noteService.togglePin(id, token);
	}
}
